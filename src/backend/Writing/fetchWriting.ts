import { writingMapById } from "content/writing";
import type { Writing } from "types/Writing";

export default async function fetchWriting(UUID: string | null): Promise<Writing> {
  if (!UUID) throw new Error("Not Found Writing. id : " + UUID);
  const writing = writingMapById.get(UUID);
  if(writing) return writing
  else throw new Error("Not Found Writing. id : " + UUID)
}