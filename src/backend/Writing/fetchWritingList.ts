import { writingList } from "content/writing";
import type { Writing } from "types/Writing";

export default async function fetchWritingList(): Promise<Writing[]> {
  return writingList
}