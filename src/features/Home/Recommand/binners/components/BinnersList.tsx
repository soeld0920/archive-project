import useEmblaCarousel from "embla-carousel-react";
import type { WritingIndex } from "shared/types/Writing";
import { useBinnerContext } from "features/Home/Recommand/binners/context/BinnerContext";
import styles from "../Binners.module.css";
import classNames from "classnames";
import { NextButton, PrevButton } from "shared/components/features/Button";

export default function BinnersList() {
  const { writingIndexWithExplan, currentWriting, setCurrentWriting } = useBinnerContext();

  if (!writingIndexWithExplan || !currentWriting) {
    return <div>로딩 중...</div>;
  }

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true ,watchDrag : false});

  const handlePrev = () => { emblaApi?.scrollPrev(); };
  const handleNext = () => { emblaApi?.scrollNext(); };

  return (
    <div className={styles.listWrapper}>
      <PrevButton onClick={handlePrev}/>

      <div className={styles.carousel} ref={emblaRef}>
        <ul className={styles.list}>
          {Array.from({length : Math.ceil(writingIndexWithExplan.length / 3)}).map((_,i) => 
            <li key={i} className={styles.listitem}>
              {writingIndexWithExplan.slice(i * 3, (i + 1)* 3).map(w =>
                <BinnersListCard
                  key={w.writing.UUID}
                  w={w.writing}
                  isActive={w.writing.UUID === currentWriting.UUID}
                  setCurrentWriting={setCurrentWriting}
                />
              )}
            </li>
          )}
            
        </ul>
      </div>

      <NextButton onClick={handleNext}/>
    </div>
  );
}

function BinnersListCard({w, isActive, setCurrentWriting} : {w : WritingIndex, isActive : boolean, setCurrentWriting: (writing: WritingIndex) => void}) {

  return (
      <div
        key={w.UUID}
        data-uuid={w.UUID}
        onClick={() => setCurrentWriting(w)}
        className={classNames(styles.card, {[styles.active] : isActive})}
      >
        <div style={{height: 120, border: '1px solid #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          {w.image ? <img src={w.image} alt={w.title} style={{maxWidth: '100%', maxHeight: '100%'}} /> : <span style={{color:'#666'}}>사진</span>}
        </div>
        <div className={styles.cardtitle}>{w.title}</div>
      </div>
    )
}

