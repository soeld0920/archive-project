import { create } from "zustand"
import type { MainCategory, SubCategory } from "shared/types/MainCategory"

interface SearchCategoryStore {
  mainCategory: MainCategory | undefined;
  subCategory: SubCategory | undefined;
  setMainCategory: (mainCategory: MainCategory | undefined) => void;
  setSubCategory: (subCategory: SubCategory | undefined) => void;
  setAllCategory: (mainCategory: MainCategory | undefined, subCategory: SubCategory | undefined) => void;
  resetCategory: () => void;
}

//검색에 결정된 카테고리를 위한 스토어
export const useSearchCategoryStore = create<SearchCategoryStore>((set, get) => {
  return {
    mainCategory: undefined,
    subCategory: undefined,
    setMainCategory: (mainCategory: MainCategory | undefined) => set({mainCategory}),
    setSubCategory: (subCategory: SubCategory | undefined) => set({subCategory}),
    setAllCategory: (mainCategory: MainCategory | undefined, subCategory: SubCategory | undefined) => set({mainCategory, subCategory}),
    resetCategory: () => set({mainCategory: undefined, subCategory: undefined}),
  }
})