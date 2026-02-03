import type { SeletedCategory } from "shared/types/SeletedCategory";

export function buildSearchParams(
  searchText: string,
  category: SeletedCategory
): string {
  const params = new URLSearchParams();
  params.set("detail", searchText.trim());
  if(category.mainCategory) {
    params.set("mainCategory", category.mainCategory.id.toString());
  }
  if(category.subCategory) {
    params.set("subCategory", category.subCategory.id.toString());
  }
  params.set("sortBy", "정확도순");
  params.set("page", "1");
  return params.toString();
}