import { createContext, useContext } from "react";
import useSearchFilter from "../hooks/useWritings/useSearchFilter";

type FilterValue = ReturnType<typeof useSearchFilter>;
const FilterContext = createContext<FilterValue | null>(null);

export function FilterProvider({children}: {children: React.ReactNode}){
  const filter = useSearchFilter();
  return (
    <FilterContext.Provider value={filter}>
      {children}
    </FilterContext.Provider>
  )
}

export function useFilterContent(){
  const context = useContext(FilterContext);
  if(!context) throw new Error("useFilterContent must be used within a filterProvider");
  return context;
}