/*
  글 메타바 컴포넌트
  - 작성일
  - 조회수
  - 좋아요 수
  - 댓글 수
*/
import millify from "millify";
import styles from "features/Detail/DetailPage.module.css"
import { formatYYMMDD } from "features/Detail/libs/formatYYMMDD";
import { useParams } from "react-router-dom";
import { useWritingDetail } from "features/Detail/hooks/query/useWritingDetail";

export default function DetailMetaBar(){
  const {UUID} = useParams();
  const {data : writingDetail, error, isLoading, isError} = useWritingDetail(UUID ?? "")

  if(isError || isLoading) {console.error(error); return null;}
  const {createAt,updateAt, view, great, commentCount} = writingDetail

  // createAt과 updateAt이 문자열인 경우 Date 객체로 변환
  const createAtDate = typeof createAt === 'string' ? new Date(createAt) : createAt;
  const updateAtDate = typeof updateAt === 'string' ? new Date(updateAt) : updateAt;

  return(
    <dl className={styles.detailSub}>
      <dt>작성일</dt><dd><time>{formatYYMMDD(createAtDate)}</time></dd>
      {updateAtDate.getTime() !== createAtDate.getTime() && <><dt>수정일</dt><dd><time>{formatYYMMDD(updateAtDate)}</time></dd></>}
      <dt>조회수</dt> <dd>{millify(view)} </dd>
      <dt>좋아요</dt> <dd>{millify(great)}</dd> 
      <dt>댓글</dt> <dd>{commentCount}</dd>
    </dl>
  )
}