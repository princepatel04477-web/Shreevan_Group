import React from "react";
import { BatchTicket } from "@/components/journey/BatchTicket";
import { DossierStack } from "@/components/journey/DossierStack";
import {
  CH01Formulation,
  CH02Portfolio,
  CH03Quality,
  CH04Documentation,
  CH05Shipment,
  CH06YourBrand,
} from "@/components/journey";

export const metadata = {
  title: "Shreevan Group — Molecule to Manifest | Indian Pharmaceutical Exporter",
  description:
    "Indian pharmaceutical merchant exporter supplying finished formulations and Ayurveda to international markets with full regulatory dossiers.",
};

export default function Home() {
  return (
    <div className="relative w-full bg-paper text-ink min-h-screen">
      {/* BatchTicket: fixed progress ticket on top-right on desktop */}
      <BatchTicket />

      {/* DossierStack: fixed paper stack accumulating export documents as user scrolls */}
      <DossierStack />

      {/* Six Interactive Chapters: Desk-sheet stacking export journey */}
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
