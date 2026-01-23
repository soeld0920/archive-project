// SeriesSearch 컴포넌트에서 보여질 글을 다루는 훅.
// 시리즈 내 글 목록을 관리하고 정렬 기능 포함

import { useState, useMemo } from "react";
import type { WritingIndex } from "shared/types/entity/Writing";
import type { SeriesSortStandard } from "./useSeriesSort";

export function useSeriesWritings(sortStandard: SeriesSortStandard = "시리즈순"){
  const [writings, setWritings] = useState<WritingIndex[]>([]);
  
  // 정렬된 글 목록 반환
  const sortedWritings = useMemo(() => {
    if (sortStandard === "시리즈순") {
      // 응답으로 받은 순서대로 (그대로 반환)
      return writings;
    } else if (sortStandard === "최신순") {
      // 최신순이면 reverse
      return [...writings].reverse();
    }
    return writings;
  }, [writings, sortStandard]);
  
  return [sortedWritings, setWritings] as const;
}
