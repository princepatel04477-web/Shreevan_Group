import { DocId } from "@/lib/journey";

export interface IncotermItem {
  term: "EXW" | "FOB" | "CIF" | "CIP";
  title: string;
  scope: string;
  description: string;
}

export const INCOTERMS: readonly IncotermItem[] = [
  {
    term: "EXW",
    title: "Ex Works",
    scope: "Factory Floor Handover",
    description:
      "Goods made available at manufacturing facility with export packaging. Buyer arranges outbound transport, freight, and destination customs clearance.",
  },
  {
    term: "FOB",
    title: "Free on Board",
    scope: "Indian Seaport / Airport Rail Lading",
    description:
      "Indian export customs clearance, terminal handling charges (THC), and lading over the vessel rail or aircraft cargo hold included.",
  },
  {
    term: "CIF",
    title: "Cost, Insurance & Freight",
    scope: "Destination Seaport Terminal",
    description:
      "Ocean freight prepaid to named international destination port, backed by comprehensive marine cargo insurance (Institute Cargo Clauses A).",
  },
  {
    term: "CIP",
    title: "Carriage & Insurance Paid",
    scope: "Destination Airport / Inland Depot",
    description:
      "Multi-modal air or container freight prepaid with cargo transit insurance to named international airport or inland container depot (ICD).",
  },
] as const;

export interface ExportDocumentItem {
  id: DocId | "fsc";
  code: string;
  title: string;
  issuer: string;
  whenNeeded: string;
  purpose: string;
}

export const EXPORT_DOCUMENTS: readonly ExportDocumentItem[] = [
  {
    id: "product-list",
    code: "SG-DOC-01",
    title: "Product List & Specification",
    issuer: "Technical Directorate",
    whenNeeded: "Initial dossier review, tender qualification, and regulatory cross-check.",
    purpose: "Defines generic active ingredients, dosage forms, packaging presentations, and pharmacopeial standard (IP/BP/USP).",
  },
  {
    id: "coa",
    code: "SG-DOC-02",
    title: "Certificate of Analysis (COA)",
    issuer: "QC Laboratory (Licensed GMP Partner)",
    whenNeeded: "With every commercial batch for port quarantine clearance and customs release.",
    purpose: "Confirms batch-specific analytical testing: HPLC potency assay, dissolution kinetics, and microbiological compliance.",
  },
  {
    id: "gmp",
    code: "SG-DOC-03",
    title: "Manufacturer GMP Certificate",
    issuer: "State Licensing Authority / WHO Inspectorate",
    whenNeeded: "Foreign health ministry product registration and manufacturer credential filing.",
    purpose: "Attests that the manufacturing facility operates under Current Good Manufacturing Practice (cGMP) regulations.",
  },
  {
    id: "copp",
    code: "SG-DOC-04",
    title: "Certificate of Pharmaceutical Product (COPP)",
    issuer: "State Drug Regulatory Authority (WHO Format)",
    whenNeeded: "Statutory product registration and tender bidding in importing jurisdictions.",
    purpose: "Authoritative certificate establishing that the product is licensed and authorized for sale in the exporting territory.",
  },
  {
    id: "invoice",
    code: "SG-DOC-05",
    title: "Commercial Invoice & Packing List",
    issuer: "Shreevan Export Logistics Desk",
    whenNeeded: "Customs declaration, ocean vessel lading, and documentary letter of credit (L/C).",
    purpose: "Comprehensive commercial breakdown detailing HS tariff codes, batch numbers, net/gross weights, and Incoterms valuations.",
  },
  {
    id: "origin",
    code: "SG-DOC-06",
    title: "Certificate of Origin",
    issuer: "Chamber of Commerce / Trade Authority",
    whenNeeded: "Customs assessment and preferential tariff eligibility at the port of destination.",
    purpose: "Official attestation confirming Indian manufacture and origin of the export consignment.",
  },
  {
    id: "fsc",
    code: "SG-DOC-07",
    title: "Free Sale Certificate (FSC)",
    issuer: "State Licensing Authority",
    whenNeeded: "Health ministry registration dossiers in specific international markets.",
    purpose: "Certifies that the formulation is freely sold in India without regulatory restrictions.",
  },
] as const;

export interface BuyerSegmentItem {
  id: string;
  title: string;
  subtitle: string;
  requirements: string;
  solution: string;
}

export const BUYER_SEGMENTS: readonly BuyerSegmentItem[] = [
  {
    id: "importers",
    title: "Importers & Distributors",
    subtitle: "Commercial distribution networks",
    requirements: "Exclusive distribution agreements, registration dossiers (CTD/ACTD), and recurring scheduled container shipments.",
    solution: "We supply finished formulations with batch-to-batch consistency, bilingual private label packaging, and registration paperwork.",
  },
  {
    id: "hospitals",
    title: "Hospital Groups & Clinics",
    subtitle: "Institutional healthcare procurement",
    requirements: "Essential medicines, injectable antibiotics, surgical supplies, and guaranteed shelf-life (min 75% remaining upon arrival).",
    solution: "Consolidated institutional shipments containing diverse oral solid and parenteral formulations packed for hospital dispensing.",
  },
  {
    id: "ngos",
    title: "NGOs & Humanitarian Agencies",
    subtitle: "Emergency and relief supply chains",
    requirements: "Rapid delivery, tamper-evident humanitarian packaging, transparent documentation, and compliance with aid agency standards.",
    solution: "Standardized emergency health packs and essential medicines supplied with inspection-ready customs manifests and fast air-freight dispatch.",
  },
  {
    id: "tenders",
    title: "Government & National Tenders",
    subtitle: "Public health ministry supply",
    requirements: "Strict compliance with tender bid documents, WHO-format COPP, laboratory test protocols, and performance bonding.",
    solution: "We participate as an approved export house, providing authorized manufacturer authorizations and exact tender specifications.",
  },
] as const;

export interface ShippingModeItem {
  mode: "ocean" | "air" | "courier";
  title: string;
  scope: string;
  transitNote: string;
  temperatureControl: string;
}

export const SHIPPING_MODES: readonly ShippingModeItem[] = [
  {
    mode: "ocean",
    title: "Full Container Load (FCL) & LCL Sea Freight",
    scope: "Major Indian Commercial Seaports",
    transitNote: "Cost-effective routing for high-volume commercial batches, dry syrups, and institutional orders.",
    temperatureControl: "Standard GP containers or reefer containers with continuous digital temperature logging.",
  },
  {
    mode: "air",
    title: "Commercial Air Freight Cargo",
    scope: "International Air Cargo Terminals",
    transitNote: "Urgent replenishment, critical anti-infectives, and temperature-sensitive biological/injectable batches.",
    temperatureControl: "Envirotainer active thermal units or passive insulated shippers with dry ice or gel packs.",
  },
  {
    mode: "courier",
    title: "Express Document & Registration Samples",
    scope: "Door-to-Door International Courier",
    transitNote: "Small-volume pre-shipment counter-samples and regulatory dossiers sent for foreign MOH evaluation.",
    temperatureControl: "Secure insulated packaging with tamper-evident serial security seals.",
  },
] as const;

export interface CartonZoneItem {
  id: string;
  zone: string;
  title: string;
  description: string;
  adaptableOptions: string[];
}

export const CARTON_ZONES: readonly CartonZoneItem[] = [
  {
    id: "language",
    zone: "Zone 01",
    title: "Destination Language & Legal Copy",
    description:
      "All regulatory warnings, storage conditions, and therapeutic indications rendered in destination languages.",
    adaptableOptions: [
      "French (Francophone Africa)",
      "Spanish (Latin America)",
      "Russian (CIS Markets)",
      "Portuguese (Lusophone Africa)",
      "Arabic & English Dual Text",
    ],
  },
  {
    id: "pack",
    zone: "Zone 02",
    title: "Primary Packaging & Blister Foils",
    description:
      "Primary packaging selected for tropical stability (Zone IVb) and institutional dispensing format.",
    adaptableOptions: [
      "Alu-Alu Cold Form Blister Foil",
      "PVC / PVDC Blister Packing",
      "Amber Glass & HDPE Tablet Containers",
      "Liquid Suspensions with Measuring Cups",
    ],
  },
  {
    id: "security",
    zone: "Zone 03",
    title: "Security & Serialization Markings",
    description:
      "Traceability codes and anti-tamper mechanisms required for legitimate supply chain authentication.",
    adaptableOptions: [
      "2D DataMatrix Serialized Codes",
      "Pharmacode Packaging Verification",
      "Tamper-Evident Carton Seals",
      "Custom Micro-Text Varnishing",
    ],
  },
  {
    id: "dossier",
    zone: "Zone 04",
    title: "Registration Dossier Alignment",
    description:
      "Exact concordance between the physical printed carton, outer shipper label, and approved marketing authorization.",
    adaptableOptions: [
      "Manufacturer Licence Number",
      "National Marketing Authorization Ref",
      "Local Responsible Importer Details",
      "Special Warning Labels (Rx Only / Schedule H)",
    ],
  },
] as const;

export interface TimelineStageItem {
  step: string;
  title: string;
  action: string;
  deliverable: string;
}

export const TIMELINE_STAGES: readonly TimelineStageItem[] = [
  {
    step: "01",
    title: "Requisition & Dossier Review",
    action: "Buyer submits product list, target strengths, and regulatory requirements.",
    deliverable: "Commercial quotation with formulation specifications and documentary availability.",
  },
  {
    step: "02",
    title: "Partner Allocation & Production",
    action: "Consignment allocated to licensed GMP-certified partner facility.",
    deliverable: "Batch manufacturing record (BMR) initiated and active ingredients verified.",
  },
  {
    step: "03",
    title: "Artwork & Packaging Customization",
    action: "Carton die-lines, blister foils, and carton labels customized to target market regulations.",
    deliverable: "Approved bilingual artwork proofs verified against registration dossiers.",
  },
  {
    step: "04",
    title: "QC Testing & Analytical Release",
    action: "Finished goods undergo HPLC assay, dissolution, and microbial testing.",
    deliverable: "Batch-wise Certificate of Analysis (COA) issued and QA release signed.",
  },
  {
    step: "05",
    title: "Export Lading & Document Despatch",
    action: "Goods loaded into export containers and cleared through customs.",
    deliverable: "Original shipping documents dispatched via courier and secure electronic transfer.",
  },
] as const;
