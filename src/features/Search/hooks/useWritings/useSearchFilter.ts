import { useReducer } from "react";
import { GREAT_RANGE_STEPS, initialFilterState, VIEW_RANGE_STEPS, type DatePreset, type FormType, type SearchFilterAction, type SearchFilterState} from "../../types/searchFilter";

export function reducer(state: SearchFilterState, action: SearchFilterAction): SearchFilterState {
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

export default function useSearchFilter(){
  const [filterState, dispatch] = useReducer(reducer,initialFilterState);

  const toggleAuthor = (value : boolean) => {
    dispatch({ type: "TOGGLE_BY_AUTHOR", payload: value });
  }
  const setAuthor = (value: string) => {
    dispatch({ type: "SET_AUTHOR", payload: value });
  }
  const setFormType = (value: FormType) => {
    dispatch({ type: "SET_FORM_TYPE", payload: value });
  }
  const setDuring = (value: DatePreset) => {
    dispatch({ type: "SET_DURING", payload: value });
  }
  const setDateRange = (payload : {from: string, to: string}) => {
    if(filterState.during !== "custom") return;
    dispatch({ type: "SET_DATE_RANGE", payload: payload});
  }
  const toggleView = (value : boolean) => {
    dispatch({ type: "SET_VIEW_ENABLED", payload: value });
  }
  const setViewRange = (payload : {min: number, max: number}) => {
    if(!filterState.viewEnabled) return;
    dispatch({ type: "SET_VIEW_RANGE", payload: payload });
  }
  const toggleGreat = (value : boolean) => {
    dispatch({ type: "SET_GREAT_ENABLED", payload: value });
  }
  const setGreatRange = (payload : {min: number, max: number}) => {
    if(!filterState.greatEnabled) return;
    dispatch({ type: "SET_GREAT_RANGE", payload: payload });
  }
  const resetFilters = () => {
    dispatch({ type: "RESET" });
  }

  return {
    filterState, toggleAuthor, setAuthor, setFormType, setDuring, setDateRange,
    toggleView, setViewRange, 
    toggleGreat, setGreatRange, resetFilters} as const
}