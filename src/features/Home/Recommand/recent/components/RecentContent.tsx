import { useEffect } from "react";
import { useRecentContext } from "../context/RecentContext";
import { usePageContext } from "../context/PageContext";
import styles from "../Recent.module.css";
import RecentCard from "./RecentCard";
import useEmblaCarousel from "embla-carousel-react";

export default function RecentContent(){
  const {writings, PAGE_SIZE} = useRecentContext();
  const {page, setPage, pageCount, setPageCount, prevPage, nextPage} = usePageContext();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true ,watchDrag : false});

  const handlePrev = () => { emblaApi?.scrollPrev(); prevPage();};
  const handleNext = () => { emblaApi?.scrollNext(); nextPage();};

  // pageCount 업데이트
  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(writings.length / PAGE_SIZE));
    setPageCount(totalPages);
  }, [writings.length, PAGE_SIZE, setPageCount]);

  // 필터 변경 시 페이지를 1로 초기화
  useEffect(() => {
    setPage(1);
  }, [writings, setPage]);

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.controls}>
        <button className={styles.prevBtn} onClick={handlePrev} aria-label="이전" disabled={page <= 1}>Prev</button>
      </div>

      <div className={styles.carousel} ref={emblaRef}>
        <ul className={styles.list}>
          {Array.from({length: pageCount}).map((_, i) => {
            const start = i * PAGE_SIZE;
            const pageItems = writings.slice(start, start + PAGE_SIZE);
            return (
              <li key={i} className={styles.listitem}>
                <div className={styles.grid}>
                  {Array.from({length: PAGE_SIZE}).map((_, idx) => 
                    <RecentCard key={idx} item={pageItems[idx]}/>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className={styles.controls}>
        <button className={styles.nextBtn} onClick={handleNext} aria-label="다음" disabled={page >= pageCount}>Next</button>
      </div>
    </div>
  )
}

