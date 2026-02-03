import { create } from "zustand";

interface MainCategorySelectorStore {
  selectedMainCategoryIndex : number | undefined;
  selectMainCategoryIndex : (index : number | undefined) => void;
  next : (len : number) => void;
  prev : (len : number) => void;
}

export const useMainCategorySelectorStore = create<MainCategorySelectorStore>((set, get) => {
  return {
    selectedMainCategoryIndex : undefined,

    selectMainCategoryIndex : (index : number | undefined) => {
      if(index !== undefined){
        return set({selectedMainCategoryIndex : index});
      }
      else{
        return set({selectedMainCategoryIndex : undefined});
      }
    },

    next : (len : number) => {
      const idx = get().selectedMainCategoryIndex;
      if(idx !== undefined){
        set({selectedMainCategoryIndex : (idx + 1) % len});
      }
    },

    prev : (len : number) => {
      const idx = get().selectedMainCategoryIndex;
      if(idx !== undefined){
        set({selectedMainCategoryIndex : (idx - 1 + len) % len});
      }
    },
  }
})