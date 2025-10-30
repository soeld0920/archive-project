import type { WritingIndex } from "types/Writing";
import { initialFilterState, type SearchFilterState, type SearchFilterAction, VIEW_RANGE_STEPS, GREAT_RANGE_STEPS } from "../types/searchFilter.types";
import type { FuseResult } from "fuse.js";
import type { MainCategory, SubCategory } from "content/category";
import { isWithinInterval, parseISO, startOfToday, subDays, subMonths, subYears } from "date-fns";

export function setFilterReducer(state: SearchFilterState, action: SearchFilterAction): SearchFilterState {
  switch (action.type) {
    case "TOGGLE_BY_AUTHOR": return { ...state, byAuthor: action.payload, author: action.payload ? state.author : "" };
    case "SET_AUTHOR": return { ...state, author: action.payload };
    case "SET_FORM_TYPE": return { ...state, formType: action.payload };
    case "SET_DURING":
      return action.payload === "custom"
        ? { ...state, during: "custom" }
        : { ...state, during: action.payload };
    case "SET_DATE_RANGE": return { ...state, during: "custom", ...action.payload };
    case "SET_VIEW_ENABLED": return { ...state, viewEnabled: action.payload, ...(action.payload ? {} : { viewMin: undefined, viewMax: undefined }) };
    case "SET_VIEW_RANGE": return { ...state, viewRange : {min: action.payload.min || VIEW_RANGE_STEPS[0], max: action.payload.max || VIEW_RANGE_STEPS[VIEW_RANGE_STEPS.length-1]} };
    case "SET_GREAT_ENABLED": return { ...state, greatEnabled: action.payload, ...(action.payload ? {} : { greatMin: undefined, greatMax: undefined }) };
    case "SET_GREAT_RANGE": return { ...state, greatRange : {min: action.payload.min || GREAT_RANGE_STEPS[0], max: action.payload.max || GREAT_RANGE_STEPS[GREAT_RANGE_STEPS.length-1]} };
    case "HYDRATE": return { ...state, ...action.payload };
    case "RESET": return initialFilterState;
    default: return state;
  }
}

export function filterResultsByCategory(list : FuseResult<WritingIndex>[], mainCategory? : MainCategory | "", subCategory? : SubCategory) : FuseResult<WritingIndex>[] {
  return list.filter(res=> {
    const item = res.item;
    if(mainCategory && item.mainCategory !== mainCategory) return false;
    if(subCategory && item.subCategory !== subCategory) return false;
    return true;
  })
}

export function applySearchFilters(list : FuseResult<WritingIndex>[], filterState : SearchFilterState):FuseResult<WritingIndex>[]{
  const {byAuthor,author,formType,during,dateRange,viewEnabled,viewRange,greatEnabled,greatRange} = filterState;
  const {from, to} = dateRange || {}
  const viewMin = viewRange?.min, viewMax = viewRange?.max;
  
  const greatMin = greatRange?.min, greatMax = greatRange?.max;
  const today = startOfToday();

  return list.filter(i=> {
    const item = i.item;

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
