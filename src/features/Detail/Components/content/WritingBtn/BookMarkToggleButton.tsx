import { useMessageContext } from "app/providers/message"
import { useWritingContext } from "features/Detail/context/WritingContext"
import { useWritingInteractionContext } from "features/Detail/context/WritingInteractionContext"
import { useState } from "react"
import { FaBookmark, FaRegBookmark } from "react-icons/fa"
import { Button } from "antd"
import { Tooltip } from "antd"
import styles from "features/Detail/DetailPage.module.css"
import { api } from "axios/api"
import isSignin from "shared/lib/utils/isSignin";

export function BookmarkToggleButton(){
  const [messageApi] = useMessageContext()
  const {writing} = useWritingContext()
  const {bookmark, setBookmark} = useWritingInteractionContext()
  const [isBookmarkButtonPending, setIsBookmarkButtonPending] = useState(false)

  if(!writing) return null

  const onBookmarkButtonClick = async () => {
    if(isBookmarkButtonPending || !writing ) return
    if(!isSignin()) {
      messageApi.open({type : 'error', content : "로그인이 필요합니다.", duration : 2});
      return;
    }
    setIsBookmarkButtonPending(true)
    try {
      await api.put(`/writing/${writing.writingUuid}/bookmark`, {
        next : !bookmark
      });

      setBookmark(!bookmark);
      setIsBookmarkButtonPending(false)
      } catch (error: any) {
      messageApi.open({type : 'error', content : "북마크를 누를 수 없습니다.", duration : 2})
      setIsBookmarkButtonPending(false) 
    }
  }

  return(
    <Tooltip title="저장하기">
      <Button onClick={onBookmarkButtonClick} disabled={isBookmarkButtonPending}
      shape="circle" icon={bookmark ? <FaBookmark color="gold" /> : <FaRegBookmark color="gold"/>} className={styles.bookmarkBtn}/>
    </Tooltip>
  )
}