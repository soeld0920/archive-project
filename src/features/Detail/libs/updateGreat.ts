import upsertUser from "backend/User/upsertUser"
import upsertWriting from "backend/Writing/upsertWriting"
import { defaultUser } from "content/user"
import type { User } from "types/User"
import type { Writing } from "types/Writing"


export async function updateGreat(writing : Writing | null, user : User | null, next : boolean) : Promise<void>{

  if(user === null || writing === null) throw new Error("Content Error. 문의바랍니다.")
  if(user === defaultUser) throw new Error("비로그인자는 좋아요를 누를 수 없습니다.")

  const isInclude = user.greatPostIds.includes(writing.UUID)
  if(next === isInclude) throw new Error("명령이 너무 빠릅니다!")

  if(next){
    //on
    console.log("on")
    await Promise.all([upsertWriting({...writing, great : writing.great + 1}),upsertUser({...user, greatPostIds : user.greatPostIds.concat(writing.UUID)})])
  }else{
    //off
    if(writing.great <= 0) throw new Error("great can't be minus")
    console.log("off")
    await Promise.all([upsertWriting({...writing, great : writing.great - 1}),upsertUser({...user, greatPostIds : user.greatPostIds.filter(id => id !== writing.UUID)})])
  }
  return
}