import { useMessageContext } from "app/providers/message";
import { useWritingContext } from "features/Detail/context/WritingContext";
import { useWritingInteractionContext } from "features/Detail/context/WritingInteractionContext";
import { useState } from "react";
import { Button, Tooltip } from "antd";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import styles from "features/Detail/DetailPage.module.css";
import authFetch from "shared/lib/api/authFetch";


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
      const response = await authFetch(`/api/writing/${writing.writingUuid}/great`, {
        method : "PUT", 
        body : JSON.stringify({next : !great}), 
        headers : {
          "Content-Type": "application/json",
        }
      });

      if(!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "요청 실패" }));
        messageApi.open({type : 'error', content : errorData.error || "요청 실패", duration : 2});
        setIsGreatButtonPending(false);
        return;
      }

      setGreat(!great);
      setIsGreatButtonPending(false);
    } catch (error) {
      console.error("Great toggle error:", error);
      messageApi.open({type : 'error', content : "요청 실패", duration : 2});
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



