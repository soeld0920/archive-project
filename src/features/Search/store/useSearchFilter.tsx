import type { Filter } from "shared/types/Filter";
import { create } from "zustand";

interface SearchFilterStore {
  filter : Filter;
  setFilter : (filter: Filter) => void;
}

export const useSearchFilterStore = create<SearchFilterStore>((set) => ({
  filter : {},
  setFilter : (filter: Filter) => set({filter}),
}))