import { createContext, useContext } from "react"
import useRecentFilter from "../hooks/useRecentFilter";

type FilterState = ReturnType<typeof useRecentFilter>
const FilterStateContext = createContext<FilterState | null>(null)

export function FilterStateProvider({children} : {children : React.ReactNode}){
  const value = useRecentFilter();

  return(
    <FilterStateContext.Provider value={value}>
      {children}
    </FilterStateContext.Provider>
  )
}

export function useFilterStateContext(){
  const ctx = useContext(FilterStateContext);
      if (!ctx) {
        throw new Error("FilterStateContext must be uased within <RevalidatorProvider> (and under a Router).");
      }
      return ctx;
}