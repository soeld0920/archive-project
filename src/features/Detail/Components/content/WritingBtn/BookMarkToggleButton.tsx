import { useMessageContext } from "app/providers/message"
import { useWritingInteractionContext } from "features/Detail/context/WritingInteractionContext"
import { useState } from "react"
import { FaBookmark, FaRegBookmark } from "react-icons/fa"
import { Button } from "antd"
import { Tooltip } from "antd"
import styles from "features/Detail/DetailPage.module.css"
import { api } from "axios/api"
import isSignin from "shared/lib/utils/isSignin";
import { useWritingDetail } from "features/Detail/hooks/query/useWritingDetail";
import { useParams } from "react-router-dom"

export function BookmarkToggleButton(){
  const [messageApi] = useMessageContext()
  const {UUID} = useParams(); 
  const {data : writingDetail, error, isLoading, isError} = useWritingDetail(UUID ?? "")
  const {bookmark, setBookmark} = useWritingInteractionContext()
  const [isBookmarkButtonPending, setIsBookmarkButtonPending] = useState(false)

  if(isError || isLoading) {console.error(error); return null;}

  const onBookmarkButtonClick = async () => {
    if(isBookmarkButtonPending || !writingDetail ) return
    if(!isSignin()) {
      messageApi.open({type : 'error', content : "로그인이 필요합니다.", duration : 2});
      return;
    }
    setIsBookmarkButtonPending(true)
    try {
      await api.put(`/writing/${writingDetail.writingUuid}/bookmark`, {
        next : !bookmark
      });
      messageApi.open({type : 'success', content : "북마크를 눌렀습니다.", duration : 2});
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