import { createContext, useContext, useState } from "react"
import type { Filter } from "shared/types/Filter";

type ExtendedFilter = Filter & {
  tag?: string[];
}

type FilterState = ReturnType<typeof useState<ExtendedFilter>>
const FilterStateContext = createContext<FilterState | null>(null)

export function FilterStateProvider({children} : {children : React.ReactNode}){
  const value = useState<ExtendedFilter>();

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