import createGetFetch from "shared/lib/utils/createGetFetch";
import type { WritingIndex } from "shared/types/Writing";

export default async function getPopularWritingIndex() : Promise<WritingIndex[]> { 
  return createGetFetch<{writingIndex : WritingIndex[]}>("/api/writing/popular").then(data => data.writingIndex);
}