// Search 컴포넌트에서 보여질 글을 다루는 훅.
// SearchFilter와 SearchSort를 통해 검색 결과를 필터링하는 기능도 포함해야함.

import { useMemo, useState } from "react";
import type { WritingIndex } from "shared/types/Writing";
import { applySearchFilters } from "features/Search/libs/searchFilters";
import { applySearchSort } from "features/Search/libs/searchSort";
import { useSortContent } from "features/Search/context/sortContent";
import { useFilterContent } from "features/Search/context/FilterContent";

export function useWritings(){
  const [writings, setWritings] = useState<WritingIndex[]>([]);
  const {filterState} = useFilterContent();
  const [sortStandard] = useSortContent();

  //pipeline
  const filteredWritings = useMemo(() => {
    return applySearchFilters(writings, filterState);
  },[writings, filterState])

  const sortedWritings = useMemo(() => {
    return applySearchSort(filteredWritings, sortStandard);
  },[filteredWritings, sortStandard])

  return [sortedWritings, setWritings] as const;
}