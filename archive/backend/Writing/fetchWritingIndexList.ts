import { writingIndex } from "mocks/database/writing";
import type { WritingIndex } from "shared/types/Writing";

export default async function fetchWritingIndexList(): Promise<WritingIndex[]> {
  return writingIndex
}