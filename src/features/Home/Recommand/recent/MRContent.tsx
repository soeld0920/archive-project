import { useEffect, useMemo, useState } from "react";
import { useFilterStateContext } from "./context/filterState";
import type { WritingIndex } from "shared/types/Writing";
import styles from "styles/modules/Main/Recommand.module.css";
import type { MainLoaderData } from "features/Home/shared/libs/mainLoader";
import { useLoaderData } from "react-router-dom";
import MRCard from "./components/MRCard";

const PAGE_SIZE = 9; // 3x3

export default function MRContent(){
  const [filter] = useFilterStateContext();
  const [page, setPage] = useState(0);
  const pageData : MainLoaderData = useLoaderData();
  const writingIndex = pageData.writingIdxs;

  // 필터 적용
  const filtered = useMemo(() => {
    if(!filter) return writingIndex;
    return writingIndex.filter((w: WritingIndex) => {
      // main/sub
      if(filter.mainCategory && w.mainCategory !== filter.mainCategory) return false;
      if(filter.subCategory && w.subCategory !== filter.subCategory) return false;

      // dateRange: filter.dateRange.from/to are strings (ISO). compare by Date
      if(filter.dateRange){
        const from = filter.dateRange.from ? new Date(filter.dateRange.from) : undefined;
        const to = filter.dateRange.to ? new Date(filter.dateRange.to) : undefined;
        const wd = new Date(w.date);
        if(from && wd < from) return false;
        if(to && wd > to) return false;
      }

      // tag: if criteria tags provided, require at least one match
      if(filter.tag && filter.tag.length){
        const any = filter.tag.some(t => w.tag.includes(t));
        if(!any) return false;
      }

      return true;
    })
  }, [filter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  // reset page when filter changes
  useEffect(() => { setPage(0); }, [filter]);

  const start = page * PAGE_SIZE;
  const pageItems = filtered.slice(start, start + PAGE_SIZE);

  function prev(){ setPage(p => Math.max(0, p - 1)); }
  function next(){ setPage(p => Math.min(totalPages - 1, p + 1)); }

  return (
    <div className={styles.mrContentWrapper}>
      <div className={styles.mrControls}>
        <button className={styles.prevBtn} onClick={prev} aria-label="이전">Prev</button>
      </div>

      <div className={styles.mrGrid}>
        {Array.from({length: PAGE_SIZE}).map((_, idx) => 
          <MRCard item={pageItems[idx]}/>
        )}
      </div>

      <div className={styles.mrControls}>
        <button className={styles.nextBtn} onClick={next} aria-label="다음">Next</button>
      </div>
    </div>
  )
}