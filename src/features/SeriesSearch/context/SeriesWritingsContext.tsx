import { createContext, useContext } from "react";
import { useSeriesWritings } from "../hooks/useSeriesWritings";
import { useSeriesSortContent } from "./SeriesSortContext";

type SeriesWritingsValue = ReturnType<typeof useSeriesWritings>;
const SeriesWritingsContext = createContext<SeriesWritingsValue | null>(null);

export function SeriesWritingsProvider({children}: {children: React.ReactNode}){
  const [sortStandard] = useSeriesSortContent();
  const writings = useSeriesWritings(sortStandard);
  return (
    <SeriesWritingsContext.Provider value={writings}>
      {children}
    </SeriesWritingsContext.Provider>
  )
}

export function useSeriesWritingsContent(){
  const context = useContext(SeriesWritingsContext);
  if(!context) throw new Error("useSeriesWritingsContent must be used within a SeriesWritingsProvider");
  return context;
}
