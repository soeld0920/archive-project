import { create } from "zustand";

interface SearchSortStore {
  sortStandard : "정확도순"| "인기순",
  setSortStandard : (sortStandard: "정확도순"| "인기순") => void;
}

export const useSearchSortStore = create<SearchSortStore>((set) => ({
  sortStandard : "정확도순",
  setSortStandard : (sortStandard: "정확도순"| "인기순") => set({sortStandard}),
}))