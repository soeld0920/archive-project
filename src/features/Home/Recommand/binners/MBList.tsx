import useEmblaCarousel from "embla-carousel-react";
import React from "react";
import type { WritingIndex } from "shared/types/Writing";
import styles from "styles/modules/Main/Recommand.module.css";
import classNames from "classnames";

interface Props {
  writing: WritingIndex[];
  currentWriting: WritingIndex;
  setCurrentWriting: React.Dispatch<React.SetStateAction<WritingIndex>>;
}

export default function MBList({ writing, currentWriting, setCurrentWriting }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true ,watchDrag : false});

  const handlePrev = () => { emblaApi?.scrollPrev(); }
  const handleNext = () => { emblaApi?.scrollNext(); }

  return (
    <div className={styles.MBlistWrapper}>
      <button aria-label="이전" onClick={handlePrev} className={styles.MBbutton}>◀</button>

      <div className={styles.MBcarousel} ref={emblaRef}>
        <ul className={styles.MBlist}>
          {Array.from({length : Math.ceil(writing.length / 3)}).map((_,i) => 
            <li key={i} className={styles.MBlistitem}>
              {writing.slice(i * 3, (i + 1)* 3).map(w =>
                <MBListCard
                  key={w.UUID}
                  w={w}
                  isActive={w.UUID === currentWriting.UUID}
                  setCurrentWriting={setCurrentWriting}
                />
              )}
            </li>
          )}
            
        </ul>
      </div>

      <button aria-label="다음" onClick={handleNext} className={styles.MBbutton}>▶</button>
    </div>
  );
}

function MBListCard({w, isActive, setCurrentWriting} : {w : WritingIndex, isActive : boolean,setCurrentWriting: React.Dispatch<React.SetStateAction<WritingIndex>>}) {

  return (
      <div
        key={w.UUID}
        data-uuid={w.UUID}
        onClick={() => setCurrentWriting(w)}
        className={classNames(styles.MBcard, {[styles.active] : isActive})}
      >
        <div style={{height: 120, border: '1px solid #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          {w.image ? <img src={w.image} alt={w.title} style={{maxWidth: '100%', maxHeight: '100%'}} /> : <span style={{color:'#666'}}>사진</span>}
        </div>
        <div className={styles.MBcardtitle}>{w.title}</div>
      </div>
    )
}