import upsertWriting from "backend/Writing/upsertWriting"
import { defaultUser } from "mocks/database/user"
import type { Comment, Writing } from "shared/types/Writing"

export async function updateComment(writing : Writing | null, comment : Comment) : Promise<void>{
  if(!writing || !comment) throw new Error("Content Error. 문의바랍니다.")
  if(comment.writer === defaultUser.UUID) throw new Error("비로그인자는 댓글을 쓸 수 없습니다.")
  if(comment.content === "") throw new Error("글이 없습니다!")

  const isInclude = writing.comment.includes(comment)
  if(isInclude) throw new Error("명령이 너무 빠릅니다!")

  await upsertWriting({...writing, comment : writing.comment.concat(comment)})
  return
}