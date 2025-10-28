import { useReducer } from "react";
import { initialFilterState} from "../types/searchFilter.types";
import { setFilterReducer } from "../lib/searchFilters";

export default function useSearchFilter(){
  const [state, dispatch] = useReducer(setFilterReducer,initialFilterState);
  return [state, dispatch] as const
}