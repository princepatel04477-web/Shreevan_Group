import { NextRequest, NextResponse } from "next/server";
import {
  EnquiryPayloadSchema,
  generateReferenceNumber,
  EnquiryResponse,
  ENQUIRY_TYPE_LABELS,
} from "@/lib/enquiry";



// In-memory rate limiting map: ip -> array of timestamps (ms)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = process.env.NODE_ENV === "development" ? 100 : 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const timestamps = rateLimitMap.get(ip) || [];
  
  // Clean expired timestamps
  const activeTimestamps = timestamps.filter((t) => t > windowStart);
  
  if (activeTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitMap.set(ip, activeTimestamps);
    return true;
  }
  
  activeTimestamps.push(now);
  rateLimitMap.set(ip, activeTimestamps);
  return false;
}

export async function POST(req: NextRequest): Promise<NextResponse<EnquiryResponse>> {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          ok: false,
          message: "Rate limit exceeded. Maximum 5 submissions per 10 minutes.",
        },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        {
          ok: false,
          message: "Invalid JSON request body.",
        },
        { status: 400 }
      );
    }

    const result = EnquiryPayloadSchema.safeParse(body);
    if (!result.success) {
      const fieldErrors: Record<string, string[]> = {};
      for (const issue of result.error.issues) {
        const path = issue.path.join(".");
        if (!fieldErrors[path]) {
          fieldErrors[path] = [];
        }
        fieldErrors[path].push(issue.message);
      }
      return NextResponse.json(
        {
          ok: false,
          message: "Validation failed. Please correct the highlighted fields.",
          errors: fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = result.data;
    const reference = generateReferenceNumber();

    // Honeypot trap: if filled by a spam bot, silently respond ok
    if (data.hp_email && data.hp_email.length > 0) {
      return NextResponse.json({ ok: true, reference }, { status: 200 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const enquiryToEmail = process.env.ENQUIRY_TO_EMAIL;
    const enquiryFromEmail = process.env.ENQUIRY_FROM_EMAIL || "export-desk@shreevangroup.com";

    if (resendApiKey && enquiryToEmail) {
      const typeLabel = ENQUIRY_TYPE_LABELS[data.type] || data.type;
      const basketSummary = data.basketItems.length > 0
        ? data.basketItems
            .map(
              (item, i) =>
                `${i + 1}. ${item.generic} ${item.strength || ""} (${item.dosageForm}) - Qty: ${item.quantity} ${item.unit}`
            )
            .join("\n")
        : "None attached from catalogue.";

      const emailText = `
SHREEVAN GROUP · EXPORT DESK
NEW ENQUIRY RECEIVED: [${reference}]
Enquiry Type: ${typeLabel}

=== CONTACT DETAILS ===
Company: ${data.company}
Country: ${data.country}
Contact Person: ${data.name}
Role: ${data.role}
Email: ${data.email}
Phone: ${data.phone}

=== PRODUCTS / MOLECULES REQUESTED ===
${basketSummary}

Free-text Requirements:
${data.moleculesText || "None specified"}

=== COMMERCIAL TERMS ===
Incoterm: ${data.incoterm || "Not specified"}
Destination Port: ${data.destinationPort || "Not specified"}
Target Delivery Month: ${data.targetDeliveryMonth || "Not specified"}
Import Licence Holder: ${data.hasImportLicence || "Not specified"}
Registration Status: ${data.registrationStatus || "Not specified"}

Additional Notes:
${data.notes || "None"}
      `.trim();

      const resendPayload: Record<string, unknown> = {
        from: `Shreevan Export Desk <${enquiryFromEmail}>`,
        to: [enquiryToEmail],
        reply_to: data.email,
        subject: `[${reference}] ${typeLabel} - ${data.company} (${data.country})`,
        text: emailText,
      };

      if (data.file && data.file.base64) {
        resendPayload.attachments = [
          {
            filename: data.file.name,
            content: data.file.base64,
          },
        ];
      }

      // Dispatch via plain REST API fetch (no external SDK dependency)
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resendPayload),
      }).catch(() => {
        // Suppress failure and return success reference per spec
      });
    }

    return NextResponse.json(
      {
        ok: true,
        reference,
        message: "Your enquiry has been received by our export desk.",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Internal server error occurred while processing your enquiry.",
      },
      { status: 500 }
    );
  }
}
