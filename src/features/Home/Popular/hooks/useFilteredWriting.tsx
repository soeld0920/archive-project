//useFiler 기능에 더해 자동으로 필터된 writings를 반환하는 훅

import { useMemo, useState } from "react";
import useFilter from "shared/hooks/useFilter";
import type { WritingIndex } from "shared/types/Writing";
import applyWritingFilters from "../libs/applyWritingFilters";

export default function useFilteredWriting(){
  const {filter, setFilterMainCategory, setFilterSubCategory, setFilterDateRange} = useFilter();
  const [writings, setWritings] = useState<WritingIndex[]>([]);
  const filteredWritings = useMemo(() => {
    return applyWritingFilters(writings, filter);
  }, [filter, writings]);

  return {filteredWritings, filter, setWritings, setFilterMainCategory, setFilterSubCategory, setFilterDateRange} as const;
}