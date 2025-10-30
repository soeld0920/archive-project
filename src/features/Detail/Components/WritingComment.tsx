import { Flex } from "antd";
import type { MessageInstance } from "antd/es/message/interface";
import Wrapper from "components/blocks/Wrapper";
import { SubP } from "components/shared/SubSpan";
import React, { useState } from "react";
import { MdOutlineRefresh } from "react-icons/md";
import styles from "styles/modules/DetailPage.module.css"
import type { User } from "types/User";
import { updateComment } from "../libs/updateComment";
import type { Writing } from "types/Writing";
import { startOfToday } from "date-fns";
import { useRevalidatorContext } from "../context/Revalidator";
import { useMessageContext } from "context/message";

type WritingCommentProps = {
  commentContent : {user : User, content : string, date : string}[]
  writing : Writing
  user : User
}

export default function WritingComment({commentContent, writing,user} : WritingCommentProps){
  const [commentValue, setCommentValue] = useState("")
  const revalidator = useRevalidatorContext()
  const [messageApi] = useMessageContext()

  const onCommentRefresh = (e  : React.MouseEvent) => {
    e.preventDefault()
    messageApi.open({type : "loading", content : "새로고침 진행중...", key : "commentRefresh"})
    revalidator.revalidate()
    .then(() => messageApi.open({type : "success", content : "새로고침 완료!", key : "commentRefresh", duration : 2}))
    .catch(() => messageApi.open({type : "error", content : "새로고침 실패", key : "commentRefresh", duration : 2}))
  }

  const onSubmit = (e : React.MouseEvent) => {
    e.preventDefault()
    updateComment(writing,{content : commentValue, date : startOfToday().toISOString().slice(0, 10), writer : user.UUID})
    .then(() => setCommentValue(""))
    .then(() => revalidator.revalidate())
    .then(() => messageApi.open({type : "success", content : "댓글 작성 완료", duration : 2}))
    .catch((e : Error) => messageApi.open({type : "error", content : e.message, duration : 2}))
  }

  return(
    <Wrapper className={styles.commentWrapper}>
        <div className={styles.commentHeader}>
          <span>댓글 {commentContent.length}</span>
          <button className={styles.refreshBtn} onClick={(e) => onCommentRefresh(e)} disabled={revalidator.state === "loading"}>새로고침 <MdOutlineRefresh/></button>
        </div>
        <ul className={styles.commentBody}>
          {
            commentContent.map(c => 
              <li key={c.content} className={styles.commentItem}>
                <div className={styles.commentUserBanner}>
                  <img src={c.user.bannerImage} alt={`${c.user.nickname}의 프로필`} />
                </div>
                <div className={styles.commentTextbox}>
                  <Flex gap={'small'} align="end">
                    <p>{c.user.nickname}</p>
                    <SubP>{c.date}</SubP>
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