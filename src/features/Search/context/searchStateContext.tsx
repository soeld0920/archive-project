import { createContext, useContext } from "react";
import useSearchState from "../hooks/useSearchState";

type searchStateValue = ReturnType<typeof useSearchState>;
const SearchStateContext = createContext<searchStateValue | null>(null);

export function SearchStateProvider({children}: {children: React.ReactNode}){
  const searchState = useSearchState();
  return (
    <SearchStateContext.Provider value={searchState}>
      {children}
    </SearchStateContext.Provider>
  )
}

export function useSearchStateContent(){
  const context = useContext(SearchStateContext);
  if(!context) throw new Error("useSearchStateContent must be used within a SearchStateProvider");
  return context;
}