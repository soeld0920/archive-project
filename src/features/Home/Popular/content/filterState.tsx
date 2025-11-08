import { createContext, useContext, useState } from "react"
import type { MPFilter } from "../types/Filter";

type FilterState = ReturnType<typeof useState<MPFilter>>
const FilterStateContext = createContext<FilterState | null>(null)

export function FilterStateProvider({children} : {children : React.ReactNode}){
  const value = useState<MPFilter>();

  return(
    <FilterStateContext.Provider value={value}>
      {children}
    </FilterStateContext.Provider>
  )
}

export function useFilterStateContext(){
  const ctx = useContext(FilterStateContext);
      if (!ctx) {
        throw new Error("FilterStateContext must be used within <RevalidatorProvider> (and under a Router).");
      }
      return ctx;
}