import { createContext, useContext } from "react";
import useSearchSort from "../hooks/useWritings/useSearchSort";

type SortValue = ReturnType<typeof useSearchSort>;
const sortContext = createContext<SortValue | null>(null);

export function SortProvider({children}: {children: React.ReactNode}){
  const sort = useSearchSort();
  return (
    <sortContext.Provider value={sort}>
      {children}
    </sortContext.Provider>
  )
}

export function useSortContent(){
  const context = useContext(sortContext);
  if(!context) throw new Error("useSortContent must be used within a sortProvider");
  return context;
}