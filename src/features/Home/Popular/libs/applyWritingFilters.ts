import type { WritingIndex } from "shared/types/Writing";
import type { MPFilter } from "../../../../shared/types/Filter";
import { isWithinInterval, startOfToday } from "date-fns";

export default function applyWritingFilters(writings : WritingIndex[], criteria? : MPFilter) : WritingIndex[]{
  if(!criteria) criteria = {};
  const dateRange = criteria.dateRange ? {start : criteria.dateRange.from || new Date(0), end : criteria.dateRange.to || startOfToday()} : undefined

  return writings.filter(w => 
    (!criteria.mainCategory || w.mainCategory === criteria.mainCategory) &&
    (!criteria.subCategory || w.subCategory === criteria.subCategory) &&
    (!dateRange || isWithinInterval(w.date,dateRange)) 
  )
}