import type { Metadata } from "next";
import { Fraunces, Instrument_Sans, JetBrains_Mono, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { Header, Footer } from "@/components/chrome";
import { EnquiryBasketDrawer } from "@/components/basket";

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
  title: {
    template: "%s · Shreevan Group",
    default: "Shreevan Group · Pharmaceutical Merchant Exporters",
  },
  description:
    "Indian pharmaceutical merchant exporter supplying formulations and Ayurveda products to global markets with complete export documentation and regulatory compliance.",
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
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${instrumentSans.variable} ${jetbrainsMono.variable} ${notoSansDevanagari.variable} antialiased selection:bg-accent-100 selection:text-accent-700`}
    >
      <body className="min-h-screen bg-paper text-ink font-body flex flex-col justify-between">
        <div className="paper-grain" aria-hidden="true" />
        <MotionProvider>
          <Header />
          <div className="flex-1 pt-[76px] flex flex-col">{children}</div>
          <Footer />
          <EnquiryBasketDrawer />
        </MotionProvider>
      </body>
    </html>
  );
}
