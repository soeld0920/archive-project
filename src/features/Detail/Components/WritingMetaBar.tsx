import { SubP } from "components/shared/SubSpan";
import styles from "styles/modules/DetailPage.module.css"

type DetailSubInfoProps = {
  date : string;
  view : number;
  great : number;
  commentCount : number;

}

export default function WritingMetaBar({date, view, great, commentCount} : DetailSubInfoProps){
  return(
    <SubP className={styles.detailSub}>
      작성일 : {date} <br />
      조회수 : {view} | 좋아요 : {great} | 댓글 : {commentCount}
    </SubP>
  )
}