import type { FuseResult } from "fuse.js";
import type { WritingIndex } from "shared/types/Writing";

export async function fetchWritings(params : URLSearchParams) : Promise<WritingIndex[]>{
const mainCategory = params.get("mainCategory");
const subCategory = params.get("subCategory");
  
  const response = await fetch(`/api/search?${params.toString()}`,{method : "GET"});
  const data = await response.json();
  return data.writingIndex.map((item : FuseResult<WritingIndex>) => item.item).filter((item : WritingIndex) => {
      if(mainCategory && item.mainCategory !== mainCategory) return false;
      if(subCategory && item.subCategory !== subCategory) return false;
      return true;
    });
}