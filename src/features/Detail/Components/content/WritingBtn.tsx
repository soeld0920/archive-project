/*
  글 상호작용 버튼 컴포넌트
  - 좋아요 토글 버튼
  - 북마크 토글 버튼
  - 댓글 이동 버튼

  TODO : 댓글 이동 버튼 기능 구현
*/

import { FaBookmark, FaHeart, FaRegBookmark, FaRegCommentDots, FaRegHeart  } from "react-icons/fa";
import type { Writing } from "shared/types/Writing";
import type { User } from "shared/types/User";
import { Button, Flex, Tooltip } from "antd";
import {  useState } from "react";
import { useMessageContext } from "app/providers/message";
import { useWritingContext } from "features/Detail/context/WritingContext";
import putGreat from "features/Detail/libs/api/putGreat";
import styles from "features/Detail/DetailPage.module.css";

type BookmarkToggleButtonProps = {
  clicked : boolean
  writing : Writing
  user : User
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