import { FaBookmark, FaHeart, FaRegBookmark, FaRegCommentDots, FaRegHeart  } from "react-icons/fa";
import { updateGreat } from "../libs/updateGreat";
import type { Writing } from "types/Writing";
import type { User } from "types/User";
import { Button, Flex, message, Tooltip } from "antd";
import { useState } from "react";
import styles from "styles/modules/DetailPage.module.css"
import updateBookmark from "../libs/updateBookmark";
import type { MessageInstance } from "antd/es/message/interface";

type WritingInteractionProps = {
  great : {
    clicked : boolean
    onToggle : (value : boolean) => void
  }
  comment : {
    count : number
  }
  content : {
    writing : Writing
    user : User
  }
  bookmark : {
    clicked : boolean
    setClick : (v:boolean) => void
  }
  message : {
    messageApi : MessageInstance
  }
  className? : string
}

export default function WritingInteraction({great,comment,content,bookmark,message,className} : WritingInteractionProps){
  const messageApi = message.messageApi
  const [isGreatButtonPending, setIsGreatButtonPending] = useState(false)
  const [isBookmarkButtonPending, setIsBookmarkButtonPending] = useState(false)

  const printErrorMessage = (e : Error) => {
    messageApi.open({type : 'error', content : e.message, duration : 2})
  }

  const printSuccessMessage = () => {
    messageApi.open({type : 'success', content : "좋아요를 눌렀습니다.", duration : 2})
  }

  const onGreatButtonClick = async () => {
    if(isGreatButtonPending) return

    setIsGreatButtonPending(true)
    const next = !great.clicked
    await updateGreat(content.writing,content.user,next)
    .then(() => great.onToggle(next))
    .then(() => printSuccessMessage())
    .catch((e) => printErrorMessage(e))
    .finally(() => setIsGreatButtonPending(false))
    
  }

  const onBookmarkButtonClick = async () => {
    if(isBookmarkButtonPending) return

    setIsBookmarkButtonPending(true)
    
    const next = !bookmark.clicked
    await updateBookmark(content.writing,content.user,next)
    .then(() => bookmark.setClick(next))
    .then(() => printSuccessMessage())
    .catch((e) => printErrorMessage(e))
    .finally(() => setIsBookmarkButtonPending(false))
  }

  return(
    <Flex gap="small" className={className}>
      <Tooltip title="좋아요">
        <Button onClick={onGreatButtonClick} disabled={isGreatButtonPending} 
        shape="circle" icon={great.clicked ? <FaHeart color="red" /> : <FaRegHeart color="red"/>} className={styles.greatBtn}/>
      </Tooltip>
      <Tooltip title="저장하기">
        <Button onClick={onBookmarkButtonClick} disabled={isBookmarkButtonPending}
        shape="circle" icon={bookmark.clicked ? <FaBookmark color="gold" /> : <FaRegBookmark color="gold"/>} className={styles.bookmarkBtn}/>
      </Tooltip>
      <Tooltip title="댓글">
        <Button>
          <FaRegCommentDots/> {comment.count}
        </Button>
      </Tooltip>
    </Flex>
  )
}