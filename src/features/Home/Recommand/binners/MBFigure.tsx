import type { WritingIndex } from "shared/types/Writing";
import type { BinnerExplanation } from "mocks/database/binnerWriting";
import styles from "styles/modules/Main/Recommand.module.css";
import { Link, useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { clearParams } from "lib/clearParams";

type Props = {
  currentWriting: WritingIndex;
  explan?: BinnerExplanation;
}

export default function MBFigure({ currentWriting, explan }: Props){
  const [params] = useSearchParams();

  const nextParams = useMemo(() => {
    const newParams = clearParams(params);
    newParams.set('UUID', currentWriting.UUID);
    return newParams;
  }, [params, currentWriting]);

  return (
    <figure className={styles.MBfigure}>
      <img src={currentWriting.image} alt={currentWriting.title} className={styles.MBimage} />
      <figcaption className={styles.MBfigcaption}>
        <h3><Link to={`/page?${nextParams.toString()}`}>{currentWriting.title}</Link></h3>
        {explan &&
          <>
            <p className={styles.explanTitle}>
              {explan.title}
            </p>
            <p className={styles.explanDescription}>
              {explan.description}
            </p>
          </>
        }

        <dl>
          <div>
            <dt>작성자</dt>
            <dd>{currentWriting.authorName}</dd>
          </div>
          <div>
            <dt>조회수</dt>
            <dd>{currentWriting.view}</dd>
          </div>
          <div>
            <dt>좋아요</dt>
            <dd>{currentWriting.great}</dd>
          </div>
        </dl>
      </figcaption>
    </figure>
  )
}
