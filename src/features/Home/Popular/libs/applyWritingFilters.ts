import type { WritingIndex } from "shared/types/entity/Writing";
import type { Filter as FilterType} from "../../../../shared/types/Filter";
import { isWithinInterval, startOfToday } from "date-fns";

export default function applyWritingFilters(writings : WritingIndex[] | undefined, criteria? : FilterType) : WritingIndex[]{
  if(!criteria) criteria = {};
  if(!writings) return [];
  const dateRange = criteria.dateRange ? {start : criteria.dateRange.from || new Date(0), end : criteria.dateRange.to || startOfToday()} : undefined

  const filteredWritings = writings.filter(w => 
    (!criteria.mainCategory || w.mainCategoryName === criteria.mainCategory.name) &&
    (!criteria.subCategory || w.subCategoryName === criteria.subCategory.name) &&
    (!dateRange || isWithinInterval(w.date,dateRange))
  ).sort((a, b) => b.view - a.view);

  return filteredWritings;
}