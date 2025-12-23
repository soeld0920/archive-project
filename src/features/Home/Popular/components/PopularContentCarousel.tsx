import type { WritingIndex } from "shared/types/entity/Writing";
import { useCurrentPageContent } from "../context/currentPage";
import styles from "features/Home/Popular/Popular.module.css"
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import useEmblaCarousel from 'embla-carousel-react'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useEffect } from "react";
import { useFilterStateContext } from "../context/filterState";

export default function PopularContentCarousel(){ 
  const {page, setPage, pageCount, prevPage, nextPage} = useCurrentPageContent();
  const {filteredWritings} = useFilterStateContext();
  if(page === undefined || filteredWritings === undefined) return

  const [emblaRef,emblaApi] = useEmblaCarousel({loop : true, watchDrag : false})
  
  const handlePrev = () => {emblaApi?.scrollPrev();prevPage();}
  const handleNext = () => {emblaApi?.scrollNext();nextPage();}

  useEffect(() => {
    const now = emblaApi?.selectedScrollSnap()
    if(now === page) return
    if(now === undefined) return

    const gap = page - now < 0 ? page - now + pageCount : page - now;
    for(let i = 0; i < gap; i++){
      emblaApi?.scrollNext()
    }

    return
  },[page])

  useEffect(() => {
    setPage(emblaApi?.selectedScrollSnap() ?? 0)
  }, [emblaApi?.selectedScrollSnap()])

  return (
    <div className={styles.carousel}>
      <button onClick={handlePrev} className={styles.pageButton}>
        <FaArrowLeft />
      </button>
      <div className={styles.viewport} ref={emblaRef}>
        <ul className={styles.slides}>
          {
            Array.from({length : pageCount}).map((_,i) => (
              <li key={i} className={styles.slide}>
                {
                  filteredWritings.slice(i*3,(i+1)*3).map((w) => <PopularCard w={w} key={w.UUID}/>)
                }
              </li>
            ))
          }
        </ul>
      </div>
      <button onClick={handleNext} className={styles.pageButton}>
        <FaArrowRight />
      </button>
    </div>
  )
}

function PopularCard({w} : {w : WritingIndex}){
  const [param] = useSearchParams()
  const navigate = useNavigate()

  const onLinkClick = (uuid : string) => {
    param.set("UUID",uuid)
    navigate({pathname : "/page", search : `${createSearchParams(param)}`})
  }

  return(
    <div key={w.UUID} onClick={() => onLinkClick(w.UUID)}>
      <figure className={styles.card}>
        <img src={w.image} alt={`${w.title}의 대표 이미지`} className={styles.cardImage}/>
        <figcaption className={styles.cardTitle}>
          {w.title}
        </figcaption>
      </figure>
    </div>
  )
}

