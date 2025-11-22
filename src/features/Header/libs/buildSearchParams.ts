import type { SeletedCategory } from "shared/types/SeletedCategory";

export function buildSearchParams(
  searchText: string,
  category: SeletedCategory
): string {
  const params = new URLSearchParams();
  params.set("detail", searchText.trim());
  if(category.mainCategory) {
    params.set("mainCategory", category.mainCategory);
  }
  if(category.subCategory) {
    params.set("subCategory", category.subCategory);
  }
  return params.toString();
}