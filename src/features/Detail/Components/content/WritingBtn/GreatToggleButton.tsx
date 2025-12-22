import { useMessageContext } from "app/providers/message";
import { useWritingContext } from "features/Detail/context/WritingContext";
import { useWritingInteractionContext } from "features/Detail/context/WritingInteractionContext";
import { useState } from "react";
import { Button, Tooltip } from "antd";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import styles from "features/Detail/DetailPage.module.css";
import { api } from "axois/api";


export default function GreatToggleButton(){
  const [messageApi] = useMessageContext()
  const {writing} = useWritingContext()
  const {great, setGreat} = useWritingInteractionContext()
  const [isGreatButtonPending, setIsGreatButtonPending] = useState(false)

  if(!writing) return null

  const onGreatButtonClick = async () => {
    if(isGreatButtonPending || !writing) return
    setIsGreatButtonPending(true)
    try {
      await api.put(`/writing/${writing.writingUuid}/great`, {
        next : !great
      });

      setGreat(!great);
      setIsGreatButtonPending(false);
    } catch (error: any) {
      console.error("Great toggle error:", error);
      const errorMessage = error?.response?.data?.error || "요청 실패";
      messageApi.open({type : 'error', content : errorMessage, duration : 2});
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



