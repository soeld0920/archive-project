import { writingList } from "mocks/database/writing";
import type { Writing } from "shared/types/Writing";

export default async function fetchWritingList(): Promise<Writing[]> {
  return writingList
}