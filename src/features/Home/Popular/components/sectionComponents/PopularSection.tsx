//popular에 보이는 섹션 컴포넌트

import { useEffect, useMemo, useRef, useState } from "react";
import { useFilterStateContext } from "../../context/filterState";
import PopularIndicator from "../PopularIndicator";
import { useCurrentPageContent } from "../../context/currentPage";
import styles from "features/Home/Popular/Popular.module.css"
import PopularContentCarousel from "../PopularContentCarousel";
import updateButtonSize from "../../libs/updateButtonSize";
import PopularFilter from "./PopularFilter";
import type { WritingIndex } from "shared/types/entity/Writing";

export default function PopularSectionComponent(){
  //인기글을 db에서 들고와야함
  const {filteredWritings, filter, setWritings} = useFilterStateContext();
  const {page, setPage} = useCurrentPageContent();
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    fetch("/api/writing/popular")
      .then(res => {
        if(!res.ok) throw new Error(`Failed to fetch popular: ${res.statusText}`);
        return res.json();
      })
      .then((data: {writingIndex : WritingIndex[]}) => {
        setWritings(data.writingIndex);
      })
      .catch(() => setError(true));
    setPage(1);
  }, [setWritings]);

  //필터를 보여주는 버튼의 경우, 크기가 동적이기 때문에 이를 처리하는 함수
  const criteriaButtonContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    updateButtonSize(criteriaButtonContainerRef);
  }, [filter]);
  if(filteredWritings === undefined) return;

  if(page === undefined || filteredWritings === undefined) return;

  
  return(
    <div className={styles.section}>
      <header className={styles.header}>
        <div ref={criteriaButtonContainerRef} style={{display : "flex"}}>
          <h2>Popular.text</h2>
          <PopularFilter/>
        </div>
        <PopularIndicator/>
      </header>
      {error ? 
      <div>서버에서 인기 글 목록을 불러오지 못했어요. 다시 시도해주세요!</div> : 
      <PopularContentCarousel/>}
    </div>
  )
}

