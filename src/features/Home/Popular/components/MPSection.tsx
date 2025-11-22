import type { MainLoaderData } from "features/Home/shared/libs/mainLoader";
import { useLoaderData } from "react-router-dom"
import { useEffect, useRef } from "react";
import applyWritingFilters from "../libs/applyWritingFilters";
import { useFilterStateContext } from "../content/filterState";
import MPCriteriaButton from "./MPCriteriaButton";
import MPIndecator from "./MPIndecator";
import { useCurrentPageContent } from "../content/currentPage";
import styles from "styles/modules/Main/Popular.module.css"
import MPContentCarousel from "./MPContentCarousel";

export default function MPSection(){
  const pageData : MainLoaderData= useLoaderData();
  const [criteria] = useFilterStateContext();
  const [currentPage, _] = useCurrentPageContent();
  const writings = applyWritingFilters(pageData.writingIdxs,criteria).slice(0,30);
  const criteriaButtonContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (criteriaButtonContainerRef.current) {
        const width = criteriaButtonContainerRef.current.offsetWidth;
        document.documentElement.style.setProperty('--criteria-button-container-width', `${width + 10}px`);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    

    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, [criteria]);

  if(writings === undefined) return
  const pageCount = Math.ceil(writings.length / 3)

  if(currentPage === undefined || writings === undefined) return

  
  return(
    <div className={styles.section}>
      <header className={styles.header}>
        <div ref={criteriaButtonContainerRef} style={{display : "flex"}}>
          <h2>Popular.text</h2>
          <MPCriteriaButton/>
        </div>
        <MPIndecator pageCount={pageCount}/>
      </header>
      <MPContentCarousel writings={writings}/>
    </div>
  )
}