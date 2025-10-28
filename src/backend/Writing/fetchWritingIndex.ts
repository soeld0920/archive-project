import { writingIndex } from "content/writing";
import type { WritingIndex } from "types/Writing";

export default async function fetchWritingIndex(UUID: string | null): Promise<WritingIndex> {
  if (!UUID) throw new Error("Not Found WritingIdx. id : " + UUID);
  const writingIdx =  writingIndex.find( w => w.UUID === UUID);
  if(writingIdx) return writingIdx
  else throw new Error("Not Found WritingIdx. id : " + UUID)
}