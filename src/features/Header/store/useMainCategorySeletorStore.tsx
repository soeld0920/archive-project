import type { MainCategory } from "shared/types/MainCategory";
import { create } from "zustand";

interface MainCategorySelectorStore {
  selectedMainCategory : MainCategory | undefined;
  selectedMainCategoryIndex : number | undefined;
  mainCategoryList : MainCategory[];
  selectMainCategoryIndex : (index : number | undefined) => void;
  setMainCategoryList : (list : MainCategory[]) => void;
  nextMainCategoryIndex : () => void;
  prevMainCategoryIndex : () => void;
}

export const useMainCategorySelectorStore = create<MainCategorySelectorStore>((set, get) => {
  return {
    selectedMainCategory : undefined,
    selectedMainCategoryIndex : undefined,
    mainCategoryList : [],
    selectMainCategoryIndex : (index : number | undefined) => {
      const {mainCategoryList} = get();
      if(index !== undefined){
        return set({selectedMainCategory : mainCategoryList[index], selectedMainCategoryIndex : index});
      }
      else{
        return set({selectedMainCategory : undefined, selectedMainCategoryIndex : undefined});
      }
    },
    setMainCategoryList : (list : MainCategory[]) => set({mainCategoryList : list}),
    nextMainCategoryIndex : () => {
      const {selectMainCategoryIndex, selectedMainCategoryIndex, mainCategoryList} = get();
      if(selectedMainCategoryIndex !== undefined){
        selectMainCategoryIndex((selectedMainCategoryIndex + 1) % mainCategoryList.length);
      }
    },
    prevMainCategoryIndex : () => {
      const {selectMainCategoryIndex, selectedMainCategoryIndex, mainCategoryList} = get();
      if(selectedMainCategoryIndex !== undefined){
        selectMainCategoryIndex((selectedMainCategoryIndex - 1 + mainCategoryList.length) % mainCategoryList.length);
      }
    },
  }
})