import { useState } from "react";

export type SeriesSortStandard = "시리즈순" | "최신순";

export default function useSeriesSort(){
  const [sortStandard, setSortStandard] = useState<SeriesSortStandard>("시리즈순");
  return [sortStandard, setSortStandard] as const
}
