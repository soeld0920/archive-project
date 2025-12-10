import type { MainCategory, SubCategory } from "shared/types/category"

export type Filter = {
  mainCategory? : MainCategory;
  subCategory? : SubCategory;
  dateRange? : Filter_DataRange;
}

export type Filter_DataRange = {
  from? : string;
  to? : string;
}