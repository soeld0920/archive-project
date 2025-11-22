import type { WritingIndex } from "shared/types/Writing";
import type { SearchSortStandard } from "../types/searchSortStandard";
import { compareAsc, compareDesc, parseISO } from "date-fns";
import sortWritingByScore from "shared/lib/utils/sortWritingsByScore";

export function applySearchSort(list : WritingIndex[], standard : SearchSortStandard){
  const temp =  list;
  
  //기본이 정확도 정렬.
  switch(standard){
    case "정확도순" : return temp; 
    case "인기순" : 
    const sortedIndexs = sortWritingByScore<WritingIndex>(temp,{});
    
    const orderMap = new Map(sortedIndexs.map((w, idx) => [w.UUID, idx]));
    
    temp.sort((a, b) => {
      const aOrder = orderMap.get(a.UUID) ?? 0;
      const bOrder = orderMap.get(b.UUID) ?? 0;
      return aOrder - bOrder;
    });
    
    return temp;
    case "최신순" : return temp.sort((a,b) => compareDesc(parseISO(a.date),parseISO(b.date))); 
    case "오래된순" : return temp.sort((a,b) => compareAsc(parseISO(a.date),parseISO(b.date))); 
    case "조회수 높은 순" : return temp.sort((a,b) => b.view - a.view); 
    case "조회수 낮은 순" : return temp.sort((a,b) => a.view - b.view); 
    case "좋아요 많은 순" : return temp.sort((a,b) => b.great - a.great); 
    case "좋아요 적은 순" : return temp.sort((a,b) => a.great - b.great); 
    case "가나다순" : return temp.sort((a, b) => a.title.localeCompare(b.title, 'ko-KR', { sensitivity: 'base' }));
  }
}