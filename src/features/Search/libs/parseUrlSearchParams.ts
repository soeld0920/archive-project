import type { SearchSortStandard } from "../types/searchSortStandard";
import type { WritingSearchPayload } from "../hooks/query/useWritingSearchResult";

type UrlSearch = { searchParams : WritingSearchPayload, page: number, sortBy: SearchSortStandard};

export function parseUrlSearchParams(params: URLSearchParams): UrlSearch {
  function parseIntOrNull(param: string | null, name: string): number | null {
    if (param === null) return null;
    if (param.trim() === "") return null;
    const num = Number(param);
    // 정수가 아닌 경우, 또는 NaN, 또는 -1과 같은 조건에서 에러 출력
    if (!Number.isInteger(num) || num < 0) {
      throw new Error(`${name} 값이 잘못되었습니다: '${param}' (0 이상의 정수여야 합니다)`);
    }
    return num;
  }

  function parseDateOrNull(param: string | null, name: string): Date | null {
    if (param === null) return null;
    if (param.trim() === "") return null;
    const date = new Date(param);
    if (isNaN(date.getTime())) {
      throw new Error(`${name} 값이 잘못되었습니다: '${param}' (YYYY-MM-DD 형식이어야 합니다)`);
    }
    return date;
  }

  const mainId = params.get("mainCategory") !== null
    ? parseIntOrNull(params.get("mainCategory"), "mainCategory")
    : null;
  const subId = params.get("subCategory") !== null
    ? parseIntOrNull(params.get("subCategory"), "subCategory")
    : null;
  const detail = params.get("detail") || "";
  const author = params.get("author") || null;
  const date_from = parseDateOrNull(params.get("date_from"), "date_from");
  const date_to = parseDateOrNull(params.get("date_to"), "date_to");
  const view_min_str = params.get("view_min")
  const view_min = parseIntOrNull(view_min_str, "view_min")
  const view_max_str = params.get("view_max")
  const view_max = parseIntOrNull(view_max_str, "view_max")
  const great_min_str = params.get("great_min")
  const great_min = parseIntOrNull(great_min_str, "great_min")
  const great_max_str = params.get("great_max")
  const great_max = parseIntOrNull(great_max_str, "great_max")
  const page = params.get("page") !== null
    ? parseIntOrNull(params.get("page"), "page") ?? 1
    : 1;
  const sortBy = (params.get("sortBy") as SearchSortStandard) || "정확도순";
  
  //쓰기 편하게 mainId ~ great_max 까지 하나로 묶어서 반환
  return { searchParams : {mainCategoryId: mainId, subCategoryId: subId, title: detail, author, dateRange: {from: date_from, to: date_to}, viewRange: {min: view_min, max: view_max}, greatRange: {min: great_min, max: great_max}}, page, sortBy};
}

