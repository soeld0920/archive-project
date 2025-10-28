import { useState } from "react";
import type { SearchSortStandard } from "../types/searchSortStandard";

export default function useSearchSort(){
  const [sortStandard, setSortStandard] = useState<SearchSortStandard>("정확도순");
  return [sortStandard, setSortStandard] as const
}