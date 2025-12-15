import { useMessageContext } from "app/providers/message"
import { useWritingContext } from "features/Detail/context/WritingContext"
import { useWritingInteractionContext } from "features/Detail/context/WritingInteractionContext"
import { useState } from "react"
import { FaBookmark, FaRegBookmark } from "react-icons/fa"
import { Button } from "antd"
import { Tooltip } from "antd"
import styles from "features/Detail/DetailPage.module.css"
import authFetch from "shared/lib/api/authFetch"

export function BookmarkToggleButton(){
  const [messageApi] = useMessageContext()
  const {writing} = useWritingContext()
  const {bookmark, setBookmark} = useWritingInteractionContext()
  const [isBookmarkButtonPending, setIsBookmarkButtonPending] = useState(false)

  if(!writing) return null

  const onBookmarkButtonClick = async () => {
    if(isBookmarkButtonPending || !writing) return
    setIsBookmarkButtonPending(true)
    try {
      const response = await authFetch(`/api/writing/${writing.writingUuid}/bookmark`, {
        method : "PUT", 
        body : JSON.stringify({next : !bookmark}), 
        headers : {
          "Content-Type": "application/json",
        }
      });

      if(!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "요청 실패" }));
        messageApi.open({type : 'error', content : errorData.error || "요청 실패", duration : 2})
        setIsBookmarkButtonPending(false)
        return;
      }

      setBookmark(!bookmark);
      setIsBookmarkButtonPending(false)
    } catch (error) {
      console.error("Bookmark toggle error:", error);
      messageApi.open({type : 'error', content : "요청 실패", duration : 2})
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