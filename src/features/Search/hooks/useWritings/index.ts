// Search 컴포넌트에서 보여질 글을 다루는 훅.
// SearchFilter와 SearchSort를 통해 검색 결과를 필터링하는 기능도 포함해야함.

import { useState } from "react";
import type { WritingIndex } from "shared/types/Writing";

export function useWritings(){
  const [writings, setWritings] = useState<WritingIndex[]>([]);
  return [writings, setWritings] as const;
}