import classNames from "classnames";
import styles from "styles/modules/Main/Recommand.module.css";


type RecommandTypes = "binners" | "recent" | "series";

interface MRTablistProps {
  recommandType: RecommandTypes;
  setRecommandType: React.Dispatch<React.SetStateAction<RecommandTypes>>;
}

export default function MRTablist({ recommandType, setRecommandType }: MRTablistProps){
  const types: RecommandTypes[] = ["binners", "recent", "series"];

  const onKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const idx = types.indexOf(recommandType);
    if(e.key === "ArrowRight") setRecommandType(types[(idx + 1) % types.length]);
    if(e.key === "ArrowLeft") setRecommandType(types[(idx - 1 + types.length) % types.length]);
  }


  return(
    <div role="tablist" aria-label="추천 카테고리" onKeyDown={onKey} className={styles.tablist}>
      <button
        role="tab"
        aria-selected={recommandType === "binners"}
        aria-controls="panel-binners"
        id="tab-binners"
        onClick={() => setRecommandType("binners")}
        className={classNames({[styles.tab]:true, [styles.active] : recommandType === "binners" })}
      >
        초보자 추천
      </button>

      <button
        role="tab"
        aria-selected={recommandType === "recent"}
        aria-controls="panel-recent"
        id="tab-recent"
        onClick={() => setRecommandType("recent")}
        className={classNames({[styles.tab]:true, [styles.active] : recommandType === "recent" })}
      >
        최근 글
      </button>

      <button
        role="tab"
        aria-selected={recommandType === "series"}
        aria-controls="panel-series"
        id="tab-series"
        onClick={() => setRecommandType("series")}
        className={classNames({[styles.tab]:true, [styles.active] : recommandType === "series" })}
      >
        시리즈 추천
      </button>
    </div>
  )
}