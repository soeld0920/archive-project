/*
  글 상호작용 버튼 컴포넌트
  - 좋아요 토글 버튼
  - 북마크 토글 버튼
  - 댓글 이동 버튼

  TODO : 댓글 이동 버튼 기능 구현
*/

import { FaBookmark, FaHeart, FaRegBookmark, FaRegCommentDots, FaRegHeart  } from "react-icons/fa";
import { updateGreat } from "../libs/updateGreat";
import type { Writing } from "shared/types/Writing";
import type { User } from "shared/types/User";
import { Button, Flex, Tooltip } from "antd";
import {  useState } from "react";
import styles from "styles/modules/DetailPage.module.css"
import updateBookmark from "../libs/updateBookmark";
import { useRevalidatorContext } from "../context/Revalidator";
import { useMessageContext } from "app/providers/message";
import type { WritingDetailLoaderData } from "features/Search/types/WritingDetailLoaderData";
import { useLoaderData, useRouteLoaderData } from "react-router-dom";

export default function WritingInteraction(){
  const pageData : WritingDetailLoaderData = useLoaderData()
  const rookData : WritingDetailLoaderData | undefined =  useRouteLoaderData('root')
  if(!rookData) return

  const writing = pageData.writing
  const user = rookData.currentUser
  const comment = pageData.writing.comment

  return(
    <Flex gap="small">
      <GreatToggleButton writing={writing} user={user} clicked={user.greatPostIds.includes(writing.UUID)}/>
      <BookmarkToggleButton writing={writing} user={user} clicked={user.bookmarkedPostIds.includes(writing.UUID)}/>
      <CommentMoveButton length={comment.length}/>
    </Flex>
  )
}






type GreatToggleButtonProps = {
  clicked : boolean
  writing : Writing
  user : User
}

function GreatToggleButton({clicked,writing,user} : GreatToggleButtonProps){
  const [messageApi] = useMessageContext()
  const {revalidate} = useRevalidatorContext()
  const [clickedGreat, setClickedGreat] = useState(clicked)
  const [isGreatButtonPending, setIsGreatButtonPending] = useState(false)

  const onGreatButtonClick = async () => {
    if(isGreatButtonPending) return

    setIsGreatButtonPending(true)
    const next = !clicked
    await updateGreat(writing,user,next)
    .then(() => revalidate())
    .then(() => setClickedGreat(next))
    .then(() => printSuccessGreatMessage(next))
    .catch((e) => printErrorMessage(e))
    .finally(() => setIsGreatButtonPending(false))
    
  }

  const printSuccessGreatMessage = (next : boolean) => {
    if(next)messageApi.open({type : 'success', content : "좋아요를 눌렀습니다.", duration : 2})
    else messageApi.open({type : 'success', content : "좋아요를 취소했습니다.", duration : 2})
  }

  
  const printErrorMessage = (e : Error) => {
    messageApi.open({type : 'error', content : e.message, duration : 2})
  }

  return (
    <Tooltip title="좋아요">
      <Button onClick={onGreatButtonClick} disabled={isGreatButtonPending} 
      shape="circle" icon={clickedGreat ? <FaHeart color="red" /> : <FaRegHeart color="red"/>} className={styles.greatBtn}/>
    </Tooltip>
  )
}




type BookmarkToggleButtonProps = {
  clicked : boolean
  writing : Writing
  user : User
}

function BookmarkToggleButton({clicked,writing,user} :BookmarkToggleButtonProps){
  const [messageApi] = useMessageContext()
  const {revalidate} = useRevalidatorContext()
  const [clickedBookmark, setClickedBookmark] = useState(clicked)
  const [isBookmarkButtonPending, setIsBookmarkButtonPending] = useState(false)

  const onBookmarkButtonClick = async () => {
    if(isBookmarkButtonPending) return

    setIsBookmarkButtonPending(true)
    const next = !clicked
    await updateBookmark(writing,user,next)
    .then(() => revalidate())
    .then(() => setClickedBookmark(next))
    .then(() => printSuccessBookmarkMessage(next))
    .catch((e) => printErrorMessage(e))
    .finally(() => setIsBookmarkButtonPending(false))
  }

  const printSuccessBookmarkMessage = (next : boolean) => {
    if(next)messageApi.open({type : 'success', content : "글을 저장했습니다.", duration : 2})
    else messageApi.open({type : 'success', content : "글 저장을 취소했습니다.", duration : 2})
  }

  const printErrorMessage = (e : Error) => {
    messageApi.open({type : 'error', content : e.message, duration : 2})
  }

  return(
    <Tooltip title="저장하기">
      <Button onClick={onBookmarkButtonClick} disabled={isBookmarkButtonPending}
      shape="circle" icon={clickedBookmark ? <FaBookmark color="gold" /> : <FaRegBookmark color="gold"/>} className={styles.bookmarkBtn}/>
    </Tooltip>
  )
}



function CommentMoveButton({length} : {length : number}){
  return(
    <Tooltip title="댓글">
      <Button>
        <FaRegCommentDots/> {length}
      </Button>
    </Tooltip>
  )
}