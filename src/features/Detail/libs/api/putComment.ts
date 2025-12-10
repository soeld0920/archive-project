/*
  댓글을 추가하는 함수.
  body에 댓글 내용을 보내 댓글을 추가함.
  반환값은 댓글 내용용
*/

import type { CommentRes } from "shared/types/Writing";

export default async function putComment(writingUUID : string, content : CommentRes) : Promise<CommentRes>{
  const response = await fetch(`/api/comments/${writingUUID}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({content : content}),
  });
  if(!response.ok) throw new Error("Failed to put comment")
  return response.json();
}