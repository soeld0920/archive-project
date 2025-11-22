import { createContext, useContext, useState } from "react"
import type { Filter } from "../../../../shared/types/Filter";

type FilterState = ReturnType<typeof useState<Filter>>
const FilterStateContext = createContext<FilterState | null>(null)

export function FilterStateProvider({children} : {children : React.ReactNode}){
  const value = useState<Filter>();

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