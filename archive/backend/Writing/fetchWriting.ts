import { writingMapById } from "mocks/database/writing";
import type { Writing } from "shared/types/Writing";

export default async function fetchWriting(UUID: string | null): Promise<Writing> {
  if (!UUID) throw new Error("Not Found Writing. id : " + UUID);
  const writing = writingMapById.get(UUID);
  if(writing) return writing
  else throw new Error("Not Found Writing. id : " + UUID)
}