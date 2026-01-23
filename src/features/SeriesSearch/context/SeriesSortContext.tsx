import { createContext, useContext } from "react";
import useSeriesSort from "../hooks/useSeriesSort";

type SeriesSortValue = ReturnType<typeof useSeriesSort>;
const SeriesSortContext = createContext<SeriesSortValue | null>(null);

export function SeriesSortProvider({children}: {children: React.ReactNode}){
  const sort = useSeriesSort();
  return (
    <SeriesSortContext.Provider value={sort}>
      {children}
    </SeriesSortContext.Provider>
  )
}

export function useSeriesSortContent(){
  const context = useContext(SeriesSortContext);
  if(!context) throw new Error("useSeriesSortContent must be used within a SeriesSortProvider");
  return context;
}
