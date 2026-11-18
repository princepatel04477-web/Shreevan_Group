import { create } from "zustand";

export type DocId =
  | "product-list"
  | "coa"
  | "gmp"
  | "copp"
  | "invoice"
  | "origin";

export interface JourneyState {
  chapter: number;
  chapterProgress: number;
  heroProgress: number;
  docsCollected: DocId[];
  collect: (doc: DocId) => void;
  setChapter: (n: number) => void;
  setChapterProgress: (progress: number) => void;
  setHeroProgress: (progress: number) => void;
  resetJourney: () => void;
}

const STORAGE_KEY = "shreevan_docs_collected";

function getInitialDocs(): DocId[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed as DocId[];
    }
  } catch {
    // sessionStorage may be disabled or quota exceeded
  }
  return [];
}

function persistDocs(docs: DocId[]) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(docs));
  } catch {
    // safe fallback
  }
}

export const useJourney = create<JourneyState>((set, get) => ({
  chapter: 1,
  chapterProgress: 0,
  heroProgress: 0,
  docsCollected: getInitialDocs(),

  collect: (doc: DocId) => {
    const current = get().docsCollected;
    if (!current.includes(doc)) {
      const updated = [...current, doc];
      persistDocs(updated);
      set({ docsCollected: updated });
    }
  },

  setChapter: (n: number) => {
    set({ chapter: n });
  },

  setChapterProgress: (progress: number) => {
    set({ chapterProgress: progress });
  },

  setHeroProgress: (progress: number) => {
    set({ heroProgress: progress });
  },

  resetJourney: () => {
    persistDocs([]);
    set({
      chapter: 1,
      chapterProgress: 0,
      heroProgress: 0,
      docsCollected: [],
    });
  },
}));
