import getWriting from "backend/Writing/fetchWriting";
import type { Writing } from "shared/types/Writing";

//UUID => Writing
export async function fetchWritingByParams(params : URLSearchParams) : Promise<Writing>{
  return getWriting(params.get("UUID"));
}