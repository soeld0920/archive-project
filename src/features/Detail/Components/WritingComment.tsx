/*
  글 댓글 컴포넌트
  - 댓글 목록 표시
  - 댓글 작성 기능
  - 댓글 새로고침 기능
*/

import { Flex } from "antd";
import Wrapper from "shared/components/blocks/Wrapper";
import React, { useState } from "react";
import { MdOutlineRefresh } from "react-icons/md";
import styles from "features/Detail/DetailPage.module.css"
import { startOfToday } from "date-fns";
import { useMessageContext } from "app/providers/message";
import { useWritingContext } from "features/Detail/context/WritingContext";
import getComments from "shared/lib/api/getComments";
import type { CommentRes } from "shared/types/Writing";
import { useLoginContext } from "app/providers/login";
import putComment from "../libs/api/putComment";

export default function WritingComment(){
  const {writing, commentContent, setCommentContent} = useWritingContext()
  const [commentValue, setCommentValue] = useState("")
  const [messageApi] = useMessageContext()
  const [isLoading, setIsLoading] = useState(false)
  const [loginUser] = useLoginContext();

  const onCommentRefresh = async (e  : React.MouseEvent) => {
    e.preventDefault()
    setIsLoading(true)
    if(!writing) return
    messageApi.open({type : "loading", content : "새로고침 진행중...", key : "commentRefresh"})
    const comment : CommentRes[] | null = await getComments(writing.UUID)
    .catch(() => {
      messageApi.open({type : "error", content : "새로고침 실패...", duration : 2})
      setIsLoading(false)
      return commentContent;
    }) || null;
    setCommentContent(comment);
    messageApi.open({type : "success", content : "새로고침 완료", duration : 2})
    setIsLoading(false)
  }

  const onSubmit = async (e : React.MouseEvent) => {
    e.preventDefault()
    if(!loginUser){
      messageApi.open({type : "error", content : "로그인 후 댓글을 작성할 수 있습니다.", duration : 2})
      return
    }
    setIsLoading(true)
    const comment = {content : commentValue, date : startOfToday().toISOString().slice(0, 10), writer : loginUser}
    const response = await putComment(writing?.UUID || "", comment)
    .catch(() => {
      messageApi.open({type : "error", content : "댓글 작성 실패...", duration : 2})
      setIsLoading(false)
      return;
    }) || null;
    if(response){
      console.log(response.content);
      setCommentContent([...commentContent, response.content]);
      console.log(commentContent);
      setCommentValue("");
      messageApi.open({type : "success", content : "댓글 작성 완료", duration : 2})
    }
    setIsLoading(false)
  }

  return(
    <Wrapper className={styles.commentWrapper}>
        <div className={styles.commentHeader}>
          <span>댓글 {commentContent.length}</span>
          <button className={styles.refreshBtn} onClick={(e) => onCommentRefresh(e)} disabled={isLoading}>새로고침 <MdOutlineRefresh/></button>
        </div>
        <ul className={styles.commentBody}>
          {
            commentContent.map(c => 
              <li key={c.content} className={styles.commentItem}>
                <div className={styles.commentUserBanner}>
                  <img src={c.writer.bannerImage} alt={`${c.writer.nickname}의 프로필`} />
                </div>
                <div className={styles.commentTextbox}>
                  <Flex gap={'small'} align="end">
                    <p>{c.writer.nickname}</p>
                    <p className="SupSpan">{c.date}</p>
                  </Flex>
                  <p className={styles.commentContentBox}>{c.content}</p>
                </div>
              </li>
            )
          }
        </ul>
        <div className={styles.commentFoot}>
          <input type="text" className={styles.commentInput} placeholder="댓글을 입력하세요" 
          value={commentValue} onChange={(e) => setCommentValue(e.currentTarget.value)}/>
          <button className={styles.commentButton} onClick={onSubmit}>등록</button>
        </div>
      </Wrapper>
  )
}