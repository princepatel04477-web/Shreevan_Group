import { ImageResponse } from "next/og";
import { company } from "@/config/company";


export const alt = "Shreevan Group · Pharmaceutical Merchant Exporters";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          backgroundColor: "#F7F6F2",
          border: "16px solid #EEF1F0",
          fontFamily: "serif",
          color: "#0F1B24",
        }}
      >
        {/* Top Header Rail */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "2px solid #D9DDDA",
            paddingBottom: "24px",
            fontFamily: "monospace",
            fontSize: "16px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#1B4231",
          }}
        >
          <span>SHREEVAN GROUP · EXPORT DESK</span>
          <span>{company.foundedYear ? `EST. ${company.foundedYear} · INDIA` : "MERCHANT EXPORTER · INDIA"}</span>
        </div>

        {/* Central Display */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: "14px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#5E6B74",
            }}
          >
            MOLECULE TO MANIFEST · COMMERCIAL DOSSIER
          </div>
          <h1
            style={{
              fontSize: "64px",
              lineHeight: 1.1,
              fontWeight: 300,
              letterSpacing: "-0.02em",
              margin: 0,
              color: "#0F1B24",
            }}
          >
            Medicines made in India, documented for the world.
          </h1>
          <p
            style={{
              fontSize: "24px",
              lineHeight: 1.5,
              color: "#33424D",
              maxWidth: "850px",
              margin: 0,
              fontFamily: "sans-serif",
            }}
          >
            Quality-assured formulations and Ayurveda, supplied with the paperwork your regulator asks for.
          </p>
        </div>

        {/* Bottom Metadata Rail */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "2px solid #D9DDDA",
            paddingTop: "24px",
            fontFamily: "monospace",
            fontSize: "15px",
            color: "#5E6B74",
          }}
        >
          <span>AFRICA · CIS · SOUTH-EAST ASIA · LATIN AMERICA · MIDDLE EAST</span>
          <span style={{ color: "#1B4231", fontWeight: 700 }}>shreevangroup.com</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
