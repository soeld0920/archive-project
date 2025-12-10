/*
  글 메타바 컴포넌트
  - 작성일
  - 조회수
  - 좋아요 수
  - 댓글 수
*/
import { useWritingContext } from "features/Detail/context/WritingContext";
import millify from "millify";
import styles from "features/Detail/DetailPage.module.css"

export default function DetailMetaBar(){
  const {writing, greatCount} = useWritingContext()
  if(writing === null) return null;
  const {date, view, comment} = writing
  return(
    <dl className={styles.detailSub}>
      <dt>작성일</dt><dd><time>{date}</time></dd>
      <dt>조회수</dt> <dd>{millify(view)} </dd>
      <dt>좋아요</dt> <dd>{millify(greatCount)}</dd> 
      <dt>댓글</dt> <dd>{comment.length}</dd>
    </dl>
  )
}