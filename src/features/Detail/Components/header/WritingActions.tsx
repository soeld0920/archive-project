import CancelButton from "shared/components/blocks/InputComponets/CancelButton";
import CommonButton from "shared/components/blocks/InputComponets/CommonButton";
import styles from "features/Detail/DetailPage.module.css";
import { api } from "axios/api";
import { useMessageContext } from "app/providers/message";
import { useNavigate, useParams } from "react-router-dom";
import { useWritingDetail } from "features/Detail/hooks/query/useWritingDetail";

export default function WritingActions(){
  const {UUID} = useParams();
  const {data : writingDetail} = useWritingDetail(UUID ?? "")
  const [messageApi] = useMessageContext();
  const navigate = useNavigate();

  const onDelete = async () => {
    const answer = confirm('정말 삭제하시겠습니까?');
    if(!answer) return;
    if(!writingDetail) return;
    const response = await api.delete(`/writing/${writingDetail.writingUuid}`);
    if(response.status === 200) {
      messageApi.open({type : 'success', content : '글이 삭제되었습니다.', duration : 2});
      navigate(`/`);
    } else {
      messageApi.open({type : 'error', content : '글 삭제에 실패했습니다.', duration : 2});
    } 
  }

  return(
    <div className={styles.writingActions}>
      <CommonButton onClick={() => {navigate(`/write/${writingDetail?.writingUuid}/edit`)}} label="수정하기" width="45%"/>
      <CancelButton onClick={onDelete} label="삭제하기" width="45%"/>
    </div>
  )
}