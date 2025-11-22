import { type BinnerWritingData } from "mocks/handlers/writingHandlers";
import type { MainLoaderData } from "features/Home/shared/libs/mainLoader";
import { useMemo,  useState} from "react";
import { useLoaderData } from "react-router-dom";
import type { WritingIndex } from "shared/types/Writing";
import MBFigure from "./MBFigure";
import { formatYYMMDD } from "features/Detail/libs/formatYYMMDD";
import MBList from "./MBList";
import styles from "styles/modules/Main/Recommand.module.css";

export default function MB(){
  const pageData : MainLoaderData = useLoaderData();
  const {updated,explan,writing} : BinnerWritingData = useMemo(() => {
    if(pageData.binnerWritings === undefined) throw new Error("Binner Writings Data is undefined");
    return pageData.binnerWritings;
  }, [pageData.binnerWritings]);

  const [currentWriting, setCurrentWriting] =  useState<WritingIndex>(writing[0]);
  const currentExplan = useMemo(() => {
    console.log('explan', explan.find(e => e.UUID === currentWriting.UUID));
    return explan.find(e => e.UUID === currentWriting.UUID);
  }, [currentWriting, explan]);

  const updatedStr = formatYYMMDD(updated);

  return (
    <div>

      {/* 1) header */}
      <div className={styles.MBheader}>
        <h2>Beginner.text</h2>
        <span className={styles.MBupdatedDate}>최근 업데이트 : {updatedStr}</span>
      </div>

      {/* 2) figure (extracted to MBFigure) */}
      <MBFigure currentWriting={currentWriting} explan={currentExplan} />

      {/* 3) 추천 카드 리스트 (분리된 컴포넌트) */}
      <MBList
        writing={writing}
        currentWriting={currentWriting}
        setCurrentWriting={setCurrentWriting}
      />
    </div>
  )
}