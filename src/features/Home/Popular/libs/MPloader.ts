import fetchWritingList from "backend/Writing/fetchWritingList";
import type { Writing } from "types/Writing";

export default async function MPloader() : Promise<Writing[]>{
  const writingList : Writing[] = await fetchWritingList();
  return writingList
}