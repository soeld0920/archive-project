import CancelButton from "shared/components/blocks/InputComponets/CancelButton";
import CommonButton from "shared/components/blocks/InputComponets/CancelButton copy";
import styles from "features/Detail/DetailPage.module.css";

export default function WritingActions(){
  return(
    <div className={styles.writingActions}>
      <CommonButton onClick={() => {}} label="수정하기" width="45%"/>
      <CancelButton onClick={() => {}} label="삭제하기" width="45%"/>
    </div>
  )
}