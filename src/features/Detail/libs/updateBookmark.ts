import upsertUser from "backend/User/upsertUser";
import { defaultUser } from "mocks/database/user";
import type { User } from "shared/types/User";
import type { Writing } from "shared/types/Writing";

export default async function updateBookmark(writing : Writing | null, user : User | null, next : boolean) : Promise<void>{
  
  if(user === null || writing === null) throw new Error("Content Error. 문의바랍니다.")
  if(user === defaultUser) throw new Error("비로그인자는 글을 저장할 수 없습니다.")
  
  const isInclude = user.bookmarkedPostIds.includes(writing.UUID)
  if(next === isInclude) throw new Error("명령이 너무 빠릅니다!")

  if(next){
    //on
    await upsertUser({...user, bookmarkedPostIds : user.bookmarkedPostIds.concat(writing.UUID)})
  }else{
    //off
    await upsertUser({...user, bookmarkedPostIds : user.bookmarkedPostIds.filter(id => id !== writing.UUID)})
  }
  return
}