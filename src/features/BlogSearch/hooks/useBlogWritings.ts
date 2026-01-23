// BlogSearch 컴포넌트에서 보여질 글을 다루는 훅.
// 유저가 작성한 글 목록을 관리하고 정렬 기능 포함

import { useState, useMemo } from "react";
import type { WritingIndex } from "shared/types/entity/Writing";
import type { BlogSortStandard } from "./useBlogSort";

export function useBlogWritings(sortStandard: BlogSortStandard = "최신순"){
  const [writings, setWritings] = useState<WritingIndex[]>([]);
  
  // 정렬된 글 목록 반환
  const sortedWritings = useMemo(() => {
    if (sortStandard === "최신순") {
      // 최신순이면 원본 순서대로 (그대로 반환)
      return writings;
    } else if (sortStandard === "오래된순") {
      // 오래된순이면 reverse
      return [...writings].reverse();
    }
    return writings;
  }, [writings, sortStandard]);
  
  return [sortedWritings, setWritings] as const;
}
