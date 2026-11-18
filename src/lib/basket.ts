import { create } from "zustand";
import type { Product } from "./catalogue";

export interface BasketItem {
  id: string;
  generic: string;
  dosageForm: string;
  category: string;
  segment: "Allopathic" | "Ayurveda";
  packs: string[];
  quantity: number;
  unit: "boxes" | "packs" | "cartons" | "containers" | "units";
}

export interface EnquiryBasketState {
  items: BasketItem[];
  destinationCountry: string;
  isOpen: boolean;
  openBasket: () => void;
  closeBasket: () => void;
  toggleBasket: () => void;
  addItem: (product: Product, quantity?: number, unit?: BasketItem["unit"]) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateUnit: (id: string, unit: BasketItem["unit"]) => void;
  setDestinationCountry: (country: string) => void;
  clearBasket: () => void;
}

const STORAGE_KEY = "shreevan_enquiry_basket";
const COUNTRY_STORAGE_KEY = "shreevan_destination_country";

function getInitialItems(): BasketItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed as BasketItem[];
    }
  } catch {
    // localStorage may be restricted in private browsing
  }
  return [];
}

function getInitialCountry(): string {
  if (typeof window === "undefined") return "";
  try {
    return localStorage.getItem(COUNTRY_STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

function persistState(items: BasketItem[], country: string) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    localStorage.setItem(COUNTRY_STORAGE_KEY, country);
  } catch {
    // safe fallback
  }
}

export const useEnquiryBasket = create<EnquiryBasketState>((set, get) => ({
  items: getInitialItems(),
  destinationCountry: getInitialCountry(),
  isOpen: false,

  openBasket: () => set({ isOpen: true }),
  closeBasket: () => set({ isOpen: false }),
  toggleBasket: () => set((state) => ({ isOpen: !state.isOpen })),

  addItem: (product: Product, quantity = 1000, unit = "boxes") => {
    const current = get().items;
    const existingIndex = current.findIndex((i) => i.id === product.id);

    let updated: BasketItem[];
    if (existingIndex >= 0) {
      updated = current.map((item, idx) =>
        idx === existingIndex
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updated = [
        ...current,
        {
          id: product.id,
          generic: product.generic,
          dosageForm: product.dosageForm,
          category: product.category,
          segment: product.segment,
          packs: product.packs,
          quantity,
          unit,
        },
      ];
    }

    persistState(updated, get().destinationCountry);
    set({ items: updated, isOpen: true });
  },

  removeItem: (id: string) => {
    const updated = get().items.filter((i) => i.id !== id);
    persistState(updated, get().destinationCountry);
    set({ items: updated });
  },

  updateQuantity: (id: string, quantity: number) => {
    const validQty = Math.max(1, Math.floor(quantity));
    const updated = get().items.map((item) =>
      item.id === id ? { ...item, quantity: validQty } : item
    );
    persistState(updated, get().destinationCountry);
    set({ items: updated });
  },

  updateUnit: (id: string, unit: BasketItem["unit"]) => {
    const updated = get().items.map((item) =>
      item.id === id ? { ...item, unit } : item
    );
    persistState(updated, get().destinationCountry);
    set({ items: updated });
  },

  setDestinationCountry: (destinationCountry: string) => {
    persistState(get().items, destinationCountry);
    set({ destinationCountry });
  },

  clearBasket: () => {
    persistState([], "");
    set({ items: [], destinationCountry: "" });
  },
}));
