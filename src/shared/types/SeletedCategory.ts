import type { MainCategory, SubCategory } from "./MainCategory";

export type SeletedCategory = {
  mainCategory: MainCategory | undefined;
  subCategory: SubCategory | undefined;
}