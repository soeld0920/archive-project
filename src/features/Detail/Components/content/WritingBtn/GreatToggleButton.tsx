import { useMessageContext } from "app/providers/message";
import { useWritingContext } from "features/Detail/context/WritingContext";
import { useWritingInteractionContext } from "features/Detail/context/WritingInteractionContext";
import { useState } from "react";
import { Button, Tooltip } from "antd";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import styles from "features/Detail/DetailPage.module.css";
import { api } from "axois/api";
import isSignin from "shared/lib/utils/isSignin";


export default function GreatToggleButton(){
  const [messageApi] = useMessageContext()
  const {writing} = useWritingContext()
  const {great, setGreat} = useWritingInteractionContext()
  const [isGreatButtonPending, setIsGreatButtonPending] = useState(false)

  if(!writing) return null

  const onGreatButtonClick = async () => {
    if(isGreatButtonPending || !writing ) return
    if(!isSignin()) {
      messageApi.open({type : 'error', content : "로그인이 필요합니다.", duration : 2});
      return;
    }
    setIsGreatButtonPending(true)
    try {
      await api.put(`/writing/${writing.writingUuid}/great`, {
        next : !great
      });

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



