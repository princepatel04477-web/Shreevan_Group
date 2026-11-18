import { z } from "zod";

export const ENQUIRY_TYPES = [
  "rfq",
  "sourcing",
  "tender",
  "partnership",
  "complaint",
] as const;

export type EnquiryType = (typeof ENQUIRY_TYPES)[number];

export const ENQUIRY_TYPE_LABELS: Record<EnquiryType, string> = {
  rfq: "Commercial RFQ",
  sourcing: "Molecule Sourcing",
  tender: "Tender Participation",
  partnership: "Distribution Partnership",
  complaint: "Product / Quality Complaint",
};

export const BasketItemSchema = z.object({
  id: z.string(),
  generic: z.string(),
  strength: z.string().optional(),
  dosageForm: z.string(),
  quantity: z.number().positive(),
  unit: z.enum(["boxes", "units", "cartons", "containers"]),
});

export type EnquiryBasketItem = z.infer<typeof BasketItemSchema>;

export const FileAttachmentSchema = z.object({
  name: z.string(),
  size: z.number().max(10 * 1024 * 1024, "File size must not exceed 10 MB"),
  type: z.string(),
  base64: z.string().optional(),
});

export type FileAttachment = z.infer<typeof FileAttachmentSchema>;

export const EnquiryPayloadSchema = z.object({
  type: z.enum(ENQUIRY_TYPES),
  // Step 1: Who you are
  company: z.string().min(2, "Company name is required"),
  country: z.string().min(2, "Country of destination is required"),
  name: z.string().min(2, "Contact person name is required"),
  role: z.string().min(2, "Professional role is required"),
  email: z.string().email("Valid professional email address is required"),
  phone: z.string().min(6, "Contact phone with country code is required"),
  
  // Step 2: What you need
  basketItems: z.array(BasketItemSchema).default([]),
  moleculesText: z.string().optional(),
  file: FileAttachmentSchema.optional(),

  // Step 3: Terms
  incoterm: z.enum(["EXW", "FOB", "CIF", "CIP"]).optional(),
  destinationPort: z.string().optional(),
  targetDeliveryMonth: z.string().optional(),
  hasImportLicence: z.enum(["yes", "no"]).optional(),
  registrationStatus: z.enum(["registered", "need_dossier", "not_sure"]).optional(),
  notes: z.string().optional(),

  // Honeypot for bot detection (silent trap)
  hp_email: z.string().optional(),
});

export type EnquiryPayload = z.infer<typeof EnquiryPayloadSchema>;

export interface EnquiryResponse {
  ok: boolean;
  reference?: string;
  message?: string;
  errors?: Record<string, string[]>;
}

/**
 * Generates a realistic export reference number: SG-YYMMDD-XXXX
 */
export function generateReferenceNumber(): string {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  
  // Random alphanumeric 4 characters excluding confusing letters
  const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  let suffix = "";
  for (let i = 0; i < 4; i++) {
    suffix += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return `SG-${yy}${mm}${dd}-${suffix}`;
}

const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "aol.com",
  "icloud.com",
  "mail.com",
  "zoho.com",
  "yandex.com",
  "proton.me",
  "protonmail.com",
]);

/**
 * Returns true if the email is from a common public webmail service.
 * Used for soft warning, never blocking.
 */
export function isFreeEmailDomain(email: string): boolean {
  if (!email || !email.includes("@")) return false;
  const parts = email.split("@");
  if (parts.length < 2 || !parts[1]) return false;
  const domain = parts[1].toLowerCase().trim();
  return FREE_EMAIL_DOMAINS.has(domain);
}
