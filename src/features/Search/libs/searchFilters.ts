import type { WritingIndex } from "shared/types/Writing";
import { type SearchFilterState} from "../types/searchFilter";
import { isWithinInterval, parseISO, startOfToday, subDays, subMonths, subYears } from "date-fns";

export function applySearchFilters(list : WritingIndex[], filterState : SearchFilterState):WritingIndex[]{
  const {byAuthor,author,formType,during,dateRange,viewEnabled,viewRange,greatEnabled,greatRange} = filterState;
  const {from, to} = dateRange || {}
  const viewMin = viewRange?.min, viewMax = viewRange?.max;
  
  const greatMin = greatRange?.min, greatMax = greatRange?.max;
  const today = startOfToday();

  return list.filter(item => {

    //단편/시리즈
    if(formType !== "all" && item.formType !== formType) return false;

    //작성기간
    if (during !== "all") {
      const d = parseISO(item.date);

      //커스텀
      if (during === "custom") {
        const start = from ? parseISO(from) : new Date(0); // 최소값
        const end   = to   ? parseISO(to)   : today;       // 오늘까지
        if (!isWithinInterval(d, { start, end })) return false;
      } 
      //정해짐
      else {
        let start = today;
        switch (during) {
          case "7d": start = subDays(today, 7); break;
          case "1m": start = subMonths(today, 1); break;
          case "6m": start = subMonths(today, 6); break;
          case "1y": start = subYears(today, 1); break;
          case "3y": start = subYears(today, 3); break;
        }
        if (d < start) return false;
      }
    }

    //조회수
    if (viewEnabled) {
      if (viewMin != null && item.view < viewMin) return false;
      if (viewMax != null && item.view > viewMax) return false;
    }

    //좋아요
    if (greatEnabled) {
      if (greatMin != null && item.great < greatMin) return false;
      if (greatMax != null && item.great > greatMax) return false;
    }

    //작가
    if(byAuthor){
      const q = (author ?? "").trim().toLowerCase();
      if (!q) return false;
      const name = (item.authorName ?? "").toLowerCase();
      // 한글 정규화(자모/조합 섞임 방지)
      if (!name.normalize("NFC").includes(q.normalize("NFC"))) return false;
    }

    //완료
    return true;
  })
}
