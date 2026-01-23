import { useState } from "react";

export type BlogSortStandard = "최신순" | "오래된순";

export default function useBlogSort(){
  const [sortStandard, setSortStandard] = useState<BlogSortStandard>("최신순");
  return [sortStandard, setSortStandard] as const
}
