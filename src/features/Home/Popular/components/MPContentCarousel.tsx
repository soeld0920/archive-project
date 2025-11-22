import type { WritingIndex } from "shared/types/Writing";
import { useCurrentPageContent } from "../content/currentPage";
import styles from "styles/modules/Main/Popular.module.css"
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { clearParams } from "lib/clearParams";
import useEmblaCarousel from 'embla-carousel-react'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useEffect } from "react";

export default function MPContentCarousel({writings} : {writings : WritingIndex[]}){ 
  const [currentPage, setCurrentPage] = useCurrentPageContent();
  if(currentPage === undefined || writings === undefined) return
  const pageCount = Math.ceil(writings.length / 3)

  const [emblaRef,emblaApi] = useEmblaCarousel({loop : true, watchDrag : false})
  
  const handlePrev = () => {emblaApi?.scrollPrev();setCurrentPage((currentPage - 1 + pageCount) % pageCount)}
  const handleNext = () => {emblaApi?.scrollNext();setCurrentPage((currentPage + 1) % pageCount)}

  useEffect(() => {
    const now = emblaApi?.selectedScrollSnap()
    if(now === currentPage) return
    if(now === undefined) return

    const gap = currentPage - now < 0 ? currentPage - now + pageCount : currentPage - now;
    for(let i = 0; i < gap; i++){
      emblaApi?.scrollNext()
    }

    return
  },[currentPage])

  useEffect(() => {
    setCurrentPage(emblaApi?.selectedScrollSnap() ?? 0)
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
                  writings.slice(i*3,(i+1)*3).map((w) => <MPCard w={w} key={w.UUID}/>)
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

function MPCard({w} : {w : WritingIndex}){
  const [param] = useSearchParams()
  const navigate = useNavigate()

  const onLinkClick = (uuid : string) => {
    const next = clearParams(param)
    next.set("UUID",uuid)
    navigate({pathname : "/page", search : `${createSearchParams(next)}`})
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