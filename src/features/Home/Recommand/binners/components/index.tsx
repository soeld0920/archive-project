import { useBinnerContext } from "features/Home/Recommand/binners/context/BinnerContext";
import { formatYYMMDD } from "features/Detail/libs/formatYYMMDD";
import BinnersFigure from "./BinnersFigure";
import BinnersList from "./BinnersList";
import styles from "../Binners.module.css";
import { BinnerProvider } from "features/Home/Recommand/binners/context/BinnerContext";

export default function Binners() {
  return (
    <BinnerProvider>
      <BinnersInner/>
    </BinnerProvider>
  );
}


function BinnersInner(){
  const { updateAt, currentWriting } = useBinnerContext();

  if (!updateAt || !currentWriting) {
    return <div>로딩 중...</div>;
  }

  // get요청은 hook함수 안에 있음!
  
  const updatedStr = formatYYMMDD(updateAt);

  return (
    <div>
      {/* 1) header */}
      <div className={styles.header}>
        <h2>Beginner.text</h2>
        <span className={styles.updatedDate}>최근 업데이트 : {updatedStr}</span>
      </div>

      {/* 2) figure (extracted to BinnersFigure) */}
      <BinnersFigure/>

      {/* 3) 추천 카드 리스트 (분리된 컴포넌트) */}
      <BinnersList/>
    </div>
  )
}
