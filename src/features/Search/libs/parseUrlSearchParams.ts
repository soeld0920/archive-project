import type { MainCategory, SubCategory, SearchParams } from "shared/types/category";

type UrlSearch = readonly [SearchParams, string];

export function parseUrlSearchParams(params: URLSearchParams): UrlSearch {
  const main = params.get("mainCategory") as MainCategory | undefined;
  const sub = params.get("subCategory") as SubCategory | undefined;
  const detail = params.get("detail") || "";
  const userId = params.get("UUID") || "";
  return [{ mainCategory: main, subCategory: sub, detail }, userId] as const;
}

