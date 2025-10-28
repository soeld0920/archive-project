import type { FuseResult } from "fuse.js";
import type { WritingIndex } from "types/Writing";
import type { SearchSortStandard } from "../types/searchSortStandard";
import { compareAsc, compareDesc, parseISO } from "date-fns";

export function applySearchSort(list : FuseResult<WritingIndex>[], standard : SearchSortStandard){
  const temp =  [...list];
  
  switch(standard){
    case "정확도순" : return temp.sort((a,b) => (a.score || 0) - (b.score || 0)); break;
    case "최신순" : return temp.sort((a,b) => compareDesc(parseISO(a.item.date),parseISO(b.item.date))); break;
    case "오래된순" : return temp.sort((a,b) => compareAsc(parseISO(a.item.date),parseISO(b.item.date))); break;
    case "조회수 높은 순" : return temp.sort((a,b) => b.item.view - a.item.view); break;
    case "조회수 낮은 순" : return temp.sort((a,b) => a.item.view - b.item.view); break;
    case "좋아요 많은 순" : return temp.sort((a,b) => b.item.great - a.item.great); break;
    case "좋아요 적은 순" : return temp.sort((a,b) => a.item.great - b.item.great); break;
    case "가나다순" : return temp.sort((a, b) => a.item.title.localeCompare(b.item.title, 'ko-KR', { sensitivity: 'base' }));
  }
}