import type { WritingDetailLoaderData } from "features/Search/types/WritingDetailLoaderData";
import millify from "millify";
import { useLoaderData } from "react-router-dom";
import styles from "styles/modules/DetailPage.module.css"

export default function WritingMetaBar(){
  const pageData : WritingDetailLoaderData = useLoaderData()
  const {date, view, great, comment} = pageData.writing
  return(
    <dl className={styles.detailSub}>
      <dt>작성일</dt><dd><time>{date}</time></dd>
      <dt>조회수</dt> <dd>{millify(view)} </dd>
      <dt>좋아요</dt> <dd>{millify(great)}</dd> 
      <dt>댓글</dt> <dd>{comment.length}</dd>
    </dl>
  )
}