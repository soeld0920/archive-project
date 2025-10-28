import { writingList, writingMapById } from "content/writing";
import type { Writing } from "types/Writing";

export type upsertWritingResult = {
  success : true
  mode : "created" | "updated"
  writing : Writing
}

export default async function upsertWriting(next: Writing) : Promise<upsertWritingResult>{
  const idx = writingList.findIndex(u => u.UUID === next.UUID);
  let mode : "created" | "updated";
  let returnWriting : Writing;

  if (idx >= 0) {
    writingList[idx] = next;
    mode = "updated"
    returnWriting = writingList[idx]
  } else {
    writingList.push(next);  
    mode = "created" 
    returnWriting = writingList[writingList.length - 1]
  }
  
  writingMapById.set(next.UUID, next);  
  return{success : true, mode : mode, writing : returnWriting}
}
