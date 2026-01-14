import type { SeriesIndex } from "features/Write/types/SeriesIndex";
import type { WritingIndex } from "shared/types/entity/Writing";
import { useContext, useState, useEffect } from "react";
import { createContext } from "react";
import { api } from "axios/api";

type SeriesContextValue = {
  series: SeriesIndex | undefined;
  setSeries: (series: SeriesIndex | undefined) => void;
  writingList: WritingIndex[];
  setWritingList: (writingList: WritingIndex[] | ((prev: WritingIndex[]) => WritingIndex[])) => void;
};

const SeriesContext = createContext<SeriesContextValue | null>(null);

export function SeriesProvider({children} : {children : React.ReactNode}){
  const [series, setSeries] = useState<SeriesIndex | undefined>(undefined);
  const [writingList, setWritingList] = useState<WritingIndex[]>([]);

  useEffect(() => {
    if(series == null) {
      setWritingList([]);
      return;
    }
    const fetchWritingList = async () => {
      await api.get(`/writing/bySeries/${series.seriesUuid}`)
      .then((res) => setWritingList(res.data))
      .catch((err) => {
        console.log(err);
        setWritingList([]);
      });
    }
    fetchWritingList();
  }, [series?.seriesUuid]);

  const value = {
    series,
    setSeries,
    writingList,
    setWritingList,
  };

  return(
    <SeriesContext.Provider value={value}>
      {children}
    </SeriesContext.Provider>
  )
}

export function useSeriesContext() {
  const ctx = useContext(SeriesContext);
  if (!ctx) {
    throw new Error("useSeriesContext must be used within a SeriesProvider");
  }
  return ctx;
}