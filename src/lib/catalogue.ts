import { z } from "zod";
import rawCatalogue from "@/data/catalogue.json";

export const ProductSchema = z.object({
  id: z.string(),
  generic: z.string(),
  dosageForm: z.string(),
  category: z.string(),
  packs: z.array(z.string()),
  flags: z.array(z.string()),
  segment: z.enum(["Allopathic", "Ayurveda"]),
  sourceBrandRef: z.string(),
});

export type Product = z.infer<typeof ProductSchema>;

// Validate the raw catalogue on import
const catalogue: Product[] = z.array(ProductSchema).parse(rawCatalogue);

/**
 * Deterministic periodic-table style 2-letter code generator.
 * e.g., Azithromycin -> "Az", Paracetamol -> "Pa".
 * All collisions are deterministically resolved against the catalogue index.
 */
const moleculeCodeMap = new Map<string, string>();
const usedCodes = new Set<string>();

function sanitizeWord(w: string): string {
  return w.replace(/[^a-zA-Z]/g, "").toUpperCase();
}

// Pre-index catalogue generics for stable 2-letter symbols
(function initMoleculeCodes() {
  const uniqueGenerics = Array.from(new Set(catalogue.map((p) => p.generic.trim())));

  for (const generic of uniqueGenerics) {
    const words = generic.split(/[\s+/\\-]+/).map(sanitizeWord).filter(Boolean);
    let code = "";

    // Strategy 1: First letter of word 1 + first letter of word 2 (for combinations)
    if (words.length >= 2 && (words[0]?.length ?? 0) >= 1 && (words[1]?.length ?? 0) >= 1) {
      const candidate = (words[0]?.[0] ?? "X") + (words[1]?.[0] ?? "x").toLowerCase();
      if (!usedCodes.has(candidate)) {
        code = candidate;
      }
    }

    // Strategy 2: First letter + subsequent consonant/vowel in primary molecule
    if (!code && words.length > 0 && words[0]) {
      const primary = words[0];
      for (let i = 1; i < primary.length; i++) {
        const candidate = primary[0] + (primary[i] ?? "").toLowerCase();
        if (!usedCodes.has(candidate)) {
          code = candidate;
          break;
        }
      }
    }

    // Strategy 3: Exhaustive character pairs across all tokens
    if (!code && words.length > 0) {
      const combined = words.join("");
      for (let i = 0; i < combined.length; i++) {
        for (let j = i + 1; j < combined.length; j++) {
          const candidate = (combined[i] ?? "X") + (combined[j] ?? "x").toLowerCase();
          if (!usedCodes.has(candidate)) {
            code = candidate;
            break;
          }
        }
        if (code) break;
      }
    }

    // Strategy 4: Fallback sequential alphabet
    if (!code) {
      const firstLetter = words[0]?.[0] ?? "X";
      for (let c = 97; c <= 122; c++) {
        const candidate = firstLetter + String.fromCharCode(c);
        if (!usedCodes.has(candidate)) {
          code = candidate;
          break;
        }
      }
    }

    if (!code) {
      code = "Xx";
    }

    moleculeCodeMap.set(generic, code);
    usedCodes.add(code);
  }
})();

/**
 * Returns a 2-letter periodic-style code for any generic formulation name.
 */
export function moleculeCode(generic: string): string {
  const trimmed = generic.trim();
  const cached = moleculeCodeMap.get(trimmed);
  if (cached) return cached;

  // Fallback for ad-hoc / unindexed strings
  const words = trimmed.split(/[\s+/\\-]+/).map(sanitizeWord).filter(Boolean);
  const w0 = words[0];
  const w1 = words[1];
  if (words.length >= 2 && w0 && w1 && w0.length >= 1 && w1.length >= 1) {
    const c0 = w0[0] ?? "X";
    const c1 = (w1[0] ?? "x").toLowerCase();
    return c0 + c1;
  }
  if (w0 && w0.length >= 2) {
    const c0 = w0[0] ?? "X";
    const c1 = (w0[1] ?? "x").toLowerCase();
    return c0 + c1;
  }
  return "Rx";
}

/**
 * Returns public-facing products.
 * STRICT HONESTY RULE:
 * - Excludes Allopathic items where flags is non-empty.
 * - Redacts internal partner brand references (sourceBrandRef is cleared).
 * - Excludes prices/MRP.
 */
export function getPublicProducts(): Product[] {
  return catalogue
    .filter((item) => {
      if (item.segment === "Allopathic" && item.flags.length > 0) {
        return false;
      }
      return true;
    })
    .map((item) => ({
      ...item,
      sourceBrandRef: "", // Partner brand references are NEVER displayed publicly
    }));
}

/**
 * Returns all therapeutic categories with active public product counts.
 */
export function getCategories(): { category: string; count: number }[] {
  const publicProducts = getPublicProducts();
  const counts = new Map<string, number>();

  for (const item of publicProducts) {
    counts.set(item.category, (counts.get(item.category) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Returns all dosage forms with active public product counts.
 */
export function getDosageForms(): { dosageForm: string; count: number }[] {
  const publicProducts = getPublicProducts();
  const counts = new Map<string, number>();

  for (const item of publicProducts) {
    counts.set(item.dosageForm, (counts.get(item.dosageForm) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([dosageForm, count]) => ({ dosageForm, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Converts a category title to an URL-safe slug.
 */
export function categoryToSlug(category: string): string {
  return category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Resolves a category slug back to the authentic catalogue category title.
 */
export function slugToCategory(slug: string): string | undefined {
  const categories = getCategories();
  const match = categories.find((c) => categoryToSlug(c.category) === slug.toLowerCase());
  return match?.category;
}

const CATEGORY_INTROS: Record<string, string> = {
  "anti-infectives":
    "Covers antibacterial, antifungal, and antiviral formulations across oral solid, liquid, and injectable dosage forms. Sourced from licensed GMP-certified manufacturing partners.",
  "cardio-diabetic":
    "Oral antihypertensive, anti-diabetic, and lipid-regulating formulations for chronic cardiovascular and metabolic care across diverse dosage presentations.",
  "gastroenterology":
    "Formulations addressing acid disorders, digestive enzyme requirements, and gastrointestinal motility across tablets, capsules, and oral suspensions.",
  "pain-inflammation-musculoskeletal":
    "Analgesic, antipyretic, anti-inflammatory, and muscle relaxant formulations for acute and musculoskeletal clinical management.",
  "respiratory-allergy":
    "Antihistamines, bronchodilators, mucolytics, and anti-allergic formulations addressing upper and lower respiratory conditions.",
  "nutraceuticals-vitamins":
    "Therapeutic vitamin complexes, mineral formulations, and nutritional supplements prepared for export institutional and retail distribution.",
  "neuro-cns":
    "Neurological support, peripheral neuropathy management, and central nervous system formulations in oral and parenteral presentations.",
  "dermatology-personal-care":
    "Topical formulations including therapeutic creams, ointments, medicated soaps, and lotions for dermatological applications.",
  "antifungals":
    "Systemic and topical antifungal formulations formulated and packaged for stability across varied climatic zones.",
  "ayurveda-herbal":
    "Traditional AYUSH formulations and classical herbal preparations. Regulatory classification depends on destination country frameworks.",
  "womens-health":
    "Formulations supporting maternal health, hormonal balance, and gynecological clinical requirements.",
  "general-medicine":
    "Essential multi-indication formulations for outpatient healthcare, institutional supply, and hospital procurement tenders.",
};

/**
 * Returns a specific factual 2-sentence description for a therapeutic area.
 */
export function getCategoryIntro(slug: string): string {
  return (
    CATEGORY_INTROS[slug.toLowerCase()] ??
    "Formulations in this therapeutic area are sourced from licensed GMP-certified manufacturing partners with complete batch analytical documentation."
  );
}

/**
 * Retrieves a single product by ID, respecting privacy and honesty rules.
 */
export function getProduct(id: string): Product | undefined {
  const item = catalogue.find((p) => p.id === id);
  if (!item) return undefined;

  // If allopathic item has flags, it cannot be publicly retrieved
  if (item.segment === "Allopathic" && item.flags.length > 0) {
    return undefined;
  }

  return {
    ...item,
    sourceBrandRef: "",
  };
}
