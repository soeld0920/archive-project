/*
  글 댓글 컴포넌트
  - 댓글 목록 표시
  - 댓글 작성 기능
  - 댓글 새로고침 기능
*/

import { Flex } from "antd";
import Wrapper from "shared/components/blocks/Wrapper";
import React, { useState, useEffect } from "react";
import { MdOutlineRefresh } from "react-icons/md";
import styles from "features/Detail/DetailPage.module.css"
import { useMessageContext } from "app/providers/message";
import { useWritingContext } from "features/Detail/context/WritingContext";
import { api } from "axios/api";
import { formatYYMMDD } from "../libs/formatYYMMDD";
import type { CommentRes } from "shared/types/dto/comment";

export default function WritingComment(){
  const {writing} = useWritingContext()
  const [commentValue, setCommentValue] = useState("")
  const [messageApi] = useMessageContext()
  const [isLoading, setIsLoading] = useState(false)
  const [comments, setComments] = useState<CommentRes[]>([]);

  // 컴포넌트 마운트 시 댓글 로드
  useEffect(() => {
    if(writing) {
      loadComments();
    }
  }, [writing]);

  const loadComments = async () => {
    if(!writing) return;
    setIsLoading(true);
    try {
      const commentList : CommentRes[] = await api.get(`/writing/${writing.writingUuid}/comment`).then(res => res.data);
      setComments(commentList);
    } catch (error) {
      messageApi.open({type : "error", content : "댓글을 불러오는데 실패했습니다.", duration : 2});
    } finally {
      setIsLoading(false);
    }
  };

  const onCommentRefresh = async (e : React.MouseEvent) => {
    e.preventDefault();
    await loadComments();
    messageApi.open({type : "success", content : "새로고침 완료", duration : 2});
  };

  const onSubmit = async (e : React.MouseEvent) => {
    e.preventDefault();
    if(!commentValue.trim()){
      messageApi.open({type : "error", content : "댓글 내용을 입력해주세요.", duration : 2});
      return;
    }
    if(!writing){
      return;
    }
    
    setIsLoading(true);
    try {
      // TODO: 댓글 추가 API 호출
      await api.post(`/writing/${writing.writingUuid}/comment`, {
        content : commentValue
      });
      await loadComments();
      messageApi.open({type : "success", content : "댓글 작성 완료", duration : 2});
      setCommentValue("");
    } catch (error) {
      messageApi.open({type : "error", content : "댓글 작성 실패...", duration : 2});
    } finally {
      setIsLoading(false);
    }
  };

  return(
    <Wrapper className={styles.commentWrapper}>
        <div className={styles.commentHeader}>
          <span>댓글 {comments.length}</span>
          <button className={styles.refreshBtn} onClick={onCommentRefresh} disabled={isLoading}>
            새로고침 <MdOutlineRefresh/>
          </button>
        </div>
        <ul className={styles.commentBody}>
          {
            comments.map(comment => 
              <li key={comment.order} className={styles.commentItem}>
                <div className={styles.commentUserBanner}>
                  <img src={comment.userBanner} alt={`${comment.userName}의 프로필`} />
                </div>
                <div className={styles.commentTextbox}>
                  <Flex gap={'small'} align="end">
                    <p>{comment.userName}</p>
                    <p className="SupSpan">{formatYYMMDD(new Date(comment.createAt))}</p>
                  </Flex>
                  <p className={styles.commentContentBox}>{comment.content}</p>
                </div>
              </li>
            )
          }
        </ul>
        <div className={styles.commentFoot}>
          <input 
            type="text" 
            className={styles.commentInput} 
            placeholder="댓글을 입력하세요" 
            value={commentValue} 
            onChange={(e) => setCommentValue(e.currentTarget.value)}
            disabled={isLoading}
          />
          <button 
            className={styles.commentButton} 
            onClick={onSubmit}
            disabled={isLoading}
          >
            등록
          </button>
        </div>
      </Wrapper>
  )
}