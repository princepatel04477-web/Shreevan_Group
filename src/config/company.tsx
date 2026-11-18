import React from "react";
import { z } from "zod";

export const FactSchema = z.object({
  label: z.string(),
  value: z.string(),
  unit: z.string().optional(),
  asOf: z.string(),
  source: z.string().optional(),
});

export const ManufacturingPartnerSchema = z.object({
  name: z.string(),
  city: z.string(),
  certifications: z.array(z.string()),
  verifiedUrl: z.string().url().optional(),
});

export const CertificationHeldSchema = z.object({
  name: z.string(),
  issuer: z.string(),
  number: z.string().optional(),
  validTill: z.string().optional(),
  documentUrl: z.string().optional(),
});

export const MarketServedSchema = z.object({
  country: z.string(),
  iso2: z.string(),
});

export const MembershipSchema = z.object({
  name: z.string(),
  logo: z.string().optional(),
});

export const DirectorSchema = z.object({
  name: z.string(),
  role: z.string(),
  photo: z.string().optional(),
  linkedinUrl: z.string().url().optional(),
});

export const GroupEntitySchema = z.object({
  name: z.string(),
  role: z.string(),
  url: z.string().url().optional(),
});

export const CompanySchema = z.object({
  legalName: z.string(),
  tradeName: z.string(),
  entityType: z.string(),
  foundedYear: z.number().nullable(),
  cin: z.string(),
  gstin: z.string(),
  iec: z.string(),
  rcmcNumber: z.string(),
  drugLicenceNumbers: z.array(z.string()),
  registeredAddress: z.string(),
  operationsAddress: z.string(),
  phone: z.string(),
  whatsapp: z.string(),
  email: z.string(),
  exportDeskEmail: z.string(),
  story: z.array(z.string()),
  qualityPolicy: z.string(),
  facts: z.array(FactSchema),
  manufacturingPartners: z.array(ManufacturingPartnerSchema),
  certificationsHeld: z.array(CertificationHeldSchema),
  marketsServed: z.array(MarketServedSchema),
  memberships: z.array(MembershipSchema),
  directors: z.array(DirectorSchema),
  groupEntities: z.array(GroupEntitySchema),
  lastUpdated: z.string(),
});

export type Company = z.infer<typeof CompanySchema>;
export type Fact = z.infer<typeof FactSchema>;
export type ManufacturingPartner = z.infer<typeof ManufacturingPartnerSchema>;
export type CertificationHeld = z.infer<typeof CertificationHeldSchema>;
export type MarketServed = z.infer<typeof MarketServedSchema>;
export type Membership = z.infer<typeof MembershipSchema>;
export type Director = z.infer<typeof DirectorSchema>;
export type GroupEntity = z.infer<typeof GroupEntitySchema>;

/**
 * Empty by default per the Honesty Rules in AGENTS.md.
 * Facts are only added when backed by documentation.
 */
export const company: Company = {
  legalName: "",
  tradeName: "Shreevan Group",
  entityType: "",
  foundedYear: null,
  cin: "",
  gstin: "",
  iec: "",
  rcmcNumber: "",
  drugLicenceNumbers: [],
  registeredAddress: "",
  operationsAddress: "",
  phone: "",
  whatsapp: "",
  email: "",
  exportDeskEmail: "",
  story: [],
  qualityPolicy: "",
  facts: [],
  manufacturingPartners: [],
  certificationsHeld: [],
  marketsServed: [],
  memberships: [],
  directors: [],
  groupEntities: [],
  lastUpdated: "",
};

/**
 * Returns true if a given fact or attribute is non-empty and verified.
 */
export function hasValue(val: unknown): boolean {
  if (val === undefined || val === null) return false;
  if (typeof val === "string") return val.trim().length > 0;
  if (typeof val === "number") return !Number.isNaN(val);
  if (Array.isArray(val)) return val.length > 0;
  if (typeof val === "object") return Object.keys(val).length > 0;
  return Boolean(val);
}

/**
 * Renders children only when `when` is truthy and non-empty.
 * Otherwise renders nothing (zero placeholders per the constitution).
 */
export function IfFact({
  when,
  fallback = null,
  children,
}: {
  when: unknown;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}) {
  if (!hasValue(when)) {
    return <>{fallback}</>;
  }
  return <>{children}</>;
}

/**
 * Returns only facts that have both a non-empty value and an "as of" date.
 */
export function getFacts(): Fact[] {
  return company.facts.filter((fact) => hasValue(fact.value) && hasValue(fact.asOf));
}
