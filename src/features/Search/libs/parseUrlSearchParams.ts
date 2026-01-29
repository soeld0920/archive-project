type UrlSearch = {mainCategoryId: number | null, subCategoryId: number | null, detail: string};

export function parseUrlSearchParams(params: URLSearchParams): UrlSearch {
  const mainId = params.get("mainCategory") ? parseInt(params.get("mainCategory") as string) : null;
  const subId = params.get("subCategory") ? parseInt(params.get("subCategory") as string) : null;
  const detail = params.get("detail") || "";
  return { mainCategoryId: mainId, subCategoryId: subId, detail };
}

