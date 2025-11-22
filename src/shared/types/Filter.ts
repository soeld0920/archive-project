import type { MainCategory, SubCategory } from "shared/types/category"

export type Filter = {
  mainCategory? : MainCategory;
  subCategory? : SubCategory;
  dateRange? : {
    from? : string;
    to? : string;
  }
}