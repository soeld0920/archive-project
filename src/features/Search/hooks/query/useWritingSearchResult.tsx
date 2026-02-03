import { useQuery } from "@tanstack/react-query";
import { api } from "axios/api";
import type { SearchSortStandard } from "features/Search/types/searchSortStandard";

export type WritingSearchPayload = {
  mainCategoryId : number | null;
  subCategoryId : number | null;
  title : string | null;
  author : string | null;
  dateRange : {
    from: Date | null;
    to: Date | null;
  } | null;
  greatRange : {
    min: number | null;
    max: number | null;
  } | null;
  viewRange : {
    min: number | null;
    max: number | null;
  } | null;
}
export const useWritingSearchResult = (payload : WritingSearchPayload, page : number, sortBy : SearchSortStandard) => {
  const items = useQuery({
    queryKey: ["writingSearchResultList", payload, page, sortBy],
    queryFn: async () => api.post('/search', {...payload, page, sortBy}).then(res => res.data),
    enabled : !!payload.title || !page || !sortBy,
    staleTime : 1000 * 60 * 60,
  });
  const total = useQuery({
    queryKey: ["writingSearchResultTotal", payload],
    queryFn: async () => api.post('/search/length', {...payload}).then(res => res.data),
    enabled : !!payload.title,
    staleTime : 1000 * 60 * 60,
  });
  return {items, total};
}