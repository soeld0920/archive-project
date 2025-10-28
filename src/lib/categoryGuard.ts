import { MAIN_SET, SUB_MAP, type MainCategory, type SubCategory } from "content/category";

export function isMainCategory(x : string) : boolean{
  return MAIN_SET.has(x as MainCategory)
}

export function isSubCategory(x : string) : boolean{
  for(const set of SUB_MAP.values()){
    if(set.has(x as SubCategory)) return true;
  }

  return false;
}

export function isSubCategoryOf(mainCategory : MainCategory, subCategory : SubCategory){
  return SUB_MAP.get(mainCategory)?.has(subCategory) ?? false;
}