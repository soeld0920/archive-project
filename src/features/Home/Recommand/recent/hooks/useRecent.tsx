import { useEffect, useMemo, useState } from "react";
import type { WritingIndex } from "shared/types/entity/Writing";
import { useFilterStateContext } from "../context/FilterState";
import applyWritingFilters from "features/Home/Popular/libs/applyWritingFilters";

const PAGE_SIZE = 9; // 3x3

type RecentResponse = {
  writingIndex: WritingIndex[];
};

export default function useRecent() {
  const [writings, setWritings] = useState<WritingIndex[]>([]);
  const { filter } = useFilterStateContext();

  // API에서 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/writing/recent");
        if(!response.ok) throw new Error(`Failed to fetch recent: ${response.statusText}`);
        const data: RecentResponse = await response.json();
        setWritings(data.writingIndex);
      } catch (error) {
        console.error("Failed to fetch recent data:", error);
      }
    };

    fetchData();
  }, []);

  // 필터 적용
  const filteredWritings = useMemo(() => {
    if (!filter || Object.keys(filter).length === 0) return writings;
    
    const firstFilteredWritings = applyWritingFilters(
      writings, {
        mainCategory : filter.mainCategory, 
        subCategory : filter.subCategory, 
        dateRange : filter.dateRange
      });
    


    return firstFilteredWritings.filter((w: WritingIndex) => {
      // tag: if criteria tags provided, require at least one match
      if (filter.tag && filter.tag.length) {
        const any = filter.tag.some(t => w.tag.includes(t));
        if (!any) return false;
      }

      return true;
    });
  }, [writings, filter]);


  console.log(filteredWritings);
  
  return {
    writings: filteredWritings,
    setWritings,
    PAGE_SIZE,
  } as const;
}

