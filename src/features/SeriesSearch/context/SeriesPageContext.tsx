import { createContext, useContext } from "react";
import usePageAtSeriesSearch from "../hooks/usePage";

type SeriesPageValue = ReturnType<typeof usePageAtSeriesSearch>;
const SeriesPageContext = createContext<SeriesPageValue | null>(null);

export function SeriesPageProvider({children}: {children: React.ReactNode}){
  const page = usePageAtSeriesSearch();
  return (
    <SeriesPageContext.Provider value={page}>
      {children}
    </SeriesPageContext.Provider>
  )
}

export function useSeriesPageContent(){
  const context = useContext(SeriesPageContext);
  if(!context) throw new Error("useSeriesPageContent must be used within a SeriesPageProvider");
  return context;
}
