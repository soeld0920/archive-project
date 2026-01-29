import { create } from "zustand";
import { useSearchCategoryStore } from "./useSearchCategoryStore";

interface SelectorOpenStore {
  isSelectCategoryOpen : boolean;
  openSelectCategory : () => void;
  closeSelectCategory : () => void;
}

export const useSelectorOpenStore = create<SelectorOpenStore>((set) => {
  return {
    isSelectCategoryOpen : false,
    openSelectCategory : () => {
      const {resetCategory} = useSearchCategoryStore.getState();
      resetCategory();
      return set({isSelectCategoryOpen : true})
    },
    closeSelectCategory : () => set({isSelectCategoryOpen : false}),
  }
})