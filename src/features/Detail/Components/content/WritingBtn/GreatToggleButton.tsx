import { useMessageContext } from "app/providers/message";
import { useWritingInteractionContext } from "features/Detail/context/WritingInteractionContext";
import { useState } from "react";
import { Button, Tooltip } from "antd";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import styles from "features/Detail/DetailPage.module.css";
import { api } from "axios/api";
import isSignin from "shared/lib/utils/isSignin";
import { useWritingDetail } from "features/Detail/hooks/query/useWritingDetail";
import { useParams } from "react-router-dom"


export default function GreatToggleButton(){
  const [messageApi] = useMessageContext()
  const {UUID} = useParams();
  const {data : writingDetail, error, isLoading, isError} = useWritingDetail(UUID ?? "")
  const {great, setGreat} = useWritingInteractionContext()
  const [isGreatButtonPending, setIsGreatButtonPending] = useState(false)

  if(isError || isLoading) {console.error(error); return null;}

  const onGreatButtonClick = async () => {
    if(isGreatButtonPending || !writingDetail ) return
    if(!isSignin()) {
      messageApi.open({type : 'error', content : "로그인이 필요합니다.", duration : 2});
      return;
    }
    setIsGreatButtonPending(true)
    try {
      await api.put(`/writing/${writingDetail.writingUuid}/great`, {
        next : !great
      });
      messageApi.open({type : 'success', content : "좋아요를 눌렀습니다.", duration : 2});
      setGreat(!great);
      setIsGreatButtonPending(false);
    } catch (error: any) {
      messageApi.open({type : 'error', content : "좋아요를 누를 수 없습니다.", duration : 2});
      setIsGreatButtonPending(false);
    }
  }

  return (
    <Tooltip title="좋아요">
      <Button onClick={onGreatButtonClick} disabled={isGreatButtonPending} 
      shape="circle" icon={great ? <FaHeart color="red" /> : <FaRegHeart color="red"/>} className={styles.greatBtn}/>
    </Tooltip>
  )
}



