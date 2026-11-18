import type { Metadata } from "next";
import { Fraunces, Instrument_Sans, JetBrains_Mono, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { Header, Footer } from "@/components/chrome";
import { EnquiryBasketDrawer } from "@/components/basket";
import { JsonLd } from "@/components/seo/JsonLd";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shreevangroup.com"),
  title: {
    template: "%s · Shreevan Group",
    default: "Shreevan Group · Pharmaceutical Merchant Exporters",
  },
  description:
    "Indian pharmaceutical merchant exporter supplying formulations and Ayurveda products to global markets with complete export documentation and regulatory compliance.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Shreevan Group · Pharmaceutical Merchant Exporters",
    description:
      "Indian pharmaceutical merchant exporter supplying formulations and Ayurveda products to global markets with complete export documentation and regulatory compliance.",
    url: "https://shreevangroup.com",
    siteName: "Shreevan Group",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shreevan Group · Pharmaceutical Merchant Exporters",
    description:
      "Indian pharmaceutical merchant exporter supplying formulations and Ayurveda products to global markets with complete export documentation and regulatory compliance.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/brand/logo.svg",
    apple: "/brand/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalWebsiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Shreevan Group",
    url: "https://shreevangroup.com",
    description:
      "Indian pharmaceutical merchant exporter supplying formulations and Ayurveda products to global markets.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://shreevangroup.com/formulary?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${instrumentSans.variable} ${jetbrainsMono.variable} ${notoSansDevanagari.variable}`}
    >
      <body className="min-h-screen bg-paper text-ink font-body flex flex-col justify-between">
        <JsonLd data={globalWebsiteJsonLd} />
        {/* Paper texture overlay (1.5% SVG noise per constitution) */}
        <div
          className="pointer-events-none fixed inset-0 z-50 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />

        <MotionProvider>
          {/* Global Header & Skip Link */}
          <Header />

          {/* Page Body */}
          <div className="flex-1 w-full">{children}</div>

          {/* Global Footer */}
          <Footer />

          {/* Global Enquiry Basket Drawer */}
          <EnquiryBasketDrawer />
        </MotionProvider>
      </body>
    </html>
  );
}
