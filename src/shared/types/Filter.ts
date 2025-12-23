import type { FormType } from "features/Search/types/searchFilter";
import type { MainCategory, SubCategory } from "./entity/Category";

export type Filter = {
  mainCategory? : MainCategory;
  subCategory? : SubCategory;
  dateRange? : Filter_DataRange;
  tag? : string[];
  author? : string;
  form? : FormType;
  status? : {
    viewRanmge? : [number, number];
    greatRanmge? : [number, number];
  };
}

export type Filter_DataRange = {
  from? : string;
  to? : string;
}