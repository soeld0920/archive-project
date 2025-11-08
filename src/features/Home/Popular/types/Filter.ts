import type { MainCategory, SubCategory } from "content/category"

export type MPFilter = {
  mainCategory? : MainCategory;
  subCategory? : SubCategory;
  dateRange? : {
    from? : string;
    to? : string;
  }
}