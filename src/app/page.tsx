import React from "react";
import {
  CH01Formulation,
  CH02Portfolio,
  CH03Quality,
  CH04Documentation,
  CH05Shipment,
  CH06YourBrand,
} from "@/components/journey";

export const metadata = {
  title: "Shreevan Group — Indian Pharmaceutical Merchant Exporter",
  description:
    "Supplying finished pharmaceutical formulations and Ayurveda to international markets with complete regulatory dossiers, GMP certification, and export documentation.",
};

export default function Home() {
  return (
    <div className="relative w-full bg-paper text-ink min-h-screen">
      {/* Six Editorial Chapters: Natural vertical scroll without scroll-pinning or HUD clutter */}
      <main id="main-content" className="w-full">
        <CH01Formulation />
        <CH02Portfolio />
        <CH03Quality />
        <CH04Documentation />
        <CH05Shipment />
        <CH06YourBrand />
      </main>
    </div>
  );
}
