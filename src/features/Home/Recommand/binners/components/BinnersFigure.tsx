import styles from "../Binners.module.css";
import { Link } from "react-router-dom";
import { useBinnerContext } from "features/Home/Recommand/binners/context/BinnerContext";



export default function BinnersFigure(){
  const { currentWriting, currentExplan } = useBinnerContext();
  if (!currentWriting || !currentExplan) {
    return <div>로딩 중...</div>;
  }
  return (
    <figure className={styles.figure}>
      <img src={currentWriting.image} alt={currentWriting.title} className={styles.image} />
      <figcaption className={styles.figcaption}>
        <h3><Link to={`/page?UUID=${currentWriting.UUID}`}>{currentWriting.title}</Link></h3>
        {currentExplan &&
          <>
            <p className={styles.explanTitle}>
              {currentExplan.title}
            </p>
            <p className={styles.explanDescription}>
              {currentExplan.description}
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

