import type { FuseResult } from "fuse.js";
import type { WritingIndex } from "types/Writing";
import type { SearchSortStandard } from "../types/searchSortStandard";
import { compareAsc, compareDesc, parseISO } from "date-fns";
import sortWritingByScore from "lib/sortWritingsByScore";

export function applySearchSort(list : FuseResult<WritingIndex>[], standard : SearchSortStandard){
  const temp =  list;
  
  switch(standard){
    case "정확도순" : return temp.sort((a,b) => (a.score || 0) - (b.score || 0)); 
    case "인기순" : 
    const sortedIndexs = sortWritingByScore<WritingIndex>(
      temp.map(t => t.item),
      {}
    );
    
    const orderMap = new Map(sortedIndexs.map((w, idx) => [w.UUID, idx]));
    
    temp.sort((a, b) => {
      const aOrder = orderMap.get(a.item.UUID) ?? 0;
      const bOrder = orderMap.get(b.item.UUID) ?? 0;
      return aOrder - bOrder;
    });
    
    return temp;
    case "최신순" : return temp.sort((a,b) => compareDesc(parseISO(a.item.date),parseISO(b.item.date))); 
    case "오래된순" : return temp.sort((a,b) => compareAsc(parseISO(a.item.date),parseISO(b.item.date))); 
    case "조회수 높은 순" : return temp.sort((a,b) => b.item.view - a.item.view); 
    case "조회수 낮은 순" : return temp.sort((a,b) => a.item.view - b.item.view); 
    case "좋아요 많은 순" : return temp.sort((a,b) => b.item.great - a.item.great); 
    case "좋아요 적은 순" : return temp.sort((a,b) => a.item.great - b.item.great); 
    case "가나다순" : return temp.sort((a, b) => a.item.title.localeCompare(b.item.title, 'ko-KR', { sensitivity: 'base' }));
  }
}