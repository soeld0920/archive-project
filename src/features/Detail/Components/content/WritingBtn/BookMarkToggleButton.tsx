import { useMessageContext } from "app/providers/message"
import { useWritingContext } from "features/Detail/context/WritingContext"
import putBookmark from "features/Detail/libs/api/putBookmark"
import { useEffect, useState } from "react"
import { FaBookmark, FaRegBookmark } from "react-icons/fa"
import { useLoginContext } from "app/providers/login"
import { Button } from "antd"
import { Tooltip } from "antd"
import styles from "features/Detail/DetailPage.module.css"

export function BookmarkToggleButton(){
  const [messageApi] = useMessageContext()
  const [clickedBookmark, setClickedBookmark] = useState(false)
  const [isBookmarkButtonPending, setIsBookmarkButtonPending] = useState(false)
  const [loginUser] = useLoginContext()
  const {writing} = useWritingContext()

  useEffect(() => {
    if(loginUser && writing){
      setClickedBookmark(loginUser.bookmarkedPostIds.includes(writing.UUID))
    }
  }, [writing])

  if(!writing) return null

  const onBookmarkButtonClick = async () => {
    if(isBookmarkButtonPending || !writing) return
    if(!loginUser){
      messageApi.open({type : 'error', content : "로그인 후 이용해주세요.", duration : 2})
      return;
    }
    setIsBookmarkButtonPending(true)
    const response = await putBookmark(writing.UUID, loginUser.UUID)
    if(response.error) {
      messageApi.open({type : 'error', content : response.error, duration : 2})
      setIsBookmarkButtonPending(false)
      return;
    }
    if(response.toggled) messageApi.open({type : 'success', content : "글을 저장했습니다.", duration : 2})
    else messageApi.open({type : 'success', content : "글 저장을 취소했습니다.", duration : 2})
    setClickedBookmark(response.toggled)
    setIsBookmarkButtonPending(false)
  }

  return(
    <Tooltip title="저장하기">
      <Button onClick={onBookmarkButtonClick} disabled={isBookmarkButtonPending}
      shape="circle" icon={clickedBookmark ? <FaBookmark color="gold" /> : <FaRegBookmark color="gold"/>} className={styles.bookmarkBtn}/>
    </Tooltip>
  )
}