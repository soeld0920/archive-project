import { useMessageContext } from "app/providers/message";
import { useWritingContext } from "features/Detail/context/WritingContext";
import putGreat from "features/Detail/libs/api/putGreat";
import { useEffect, useState } from "react";
import { useLoginContext } from "app/providers/login";
import { Button, Tooltip } from "antd";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import styles from "features/Detail/DetailPage.module.css";


export default function GreatToggleButton(){
  const [messageApi] = useMessageContext()
  const {writing, setGreatCount} = useWritingContext()
  const [loginUser] = useLoginContext();
  const [clickedGreat, setClickedGreat] = useState(false);
  const [isGreatButtonPending, setIsGreatButtonPending] = useState(false)
  useEffect(() => {
    if(loginUser && writing){
      setClickedGreat(loginUser.greatPostIds.includes(writing.UUID));
    }
  }, [writing]);

  if(!writing) return null

  const onGreatButtonClick = async () => {
    if(isGreatButtonPending || !writing) return
    if(!loginUser){
      messageApi.open({type : 'error', content : "로그인 한 유저만 좋아요를 누를 수 있습니다.", duration : 2});
      return;
    }
    setIsGreatButtonPending(true)
    const response = await putGreat(writing.UUID, loginUser.UUID)
      if(response.error) {
        messageApi.open({type : 'error', content : response.error, duration : 2})
        setIsGreatButtonPending(false)
        return;
      }

    if(response.toggled) messageApi.open({type : 'success', content : "좋아요를 눌렀습니다.", duration : 2})
    else messageApi.open({type : 'success', content : "좋아요를 취소했습니다.", duration : 2})

    setGreatCount(response.great)
    setClickedGreat(response.toggled)
    setIsGreatButtonPending(false)
  }

  return (
    <Tooltip title="좋아요">
      <Button onClick={onGreatButtonClick} disabled={isGreatButtonPending} 
      shape="circle" icon={clickedGreat ? <FaHeart color="red" /> : <FaRegHeart color="red"/>} className={styles.greatBtn}/>
    </Tooltip>
  )
}



