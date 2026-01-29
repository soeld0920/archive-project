import { create } from "zustand";

interface SearchStateStore {
  searchState : "results" | "noResults" | "loading";
  setSearchState : (searchState: "results" | "noResults" | "loading") => void;
}

export const useSearchStateStore = create<SearchStateStore>((set) => ({
  searchState : "loading",
  setSearchState : (searchState: "results" | "noResults" | "loading") => set({searchState}),
}))