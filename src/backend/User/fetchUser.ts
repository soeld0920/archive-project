import { defaultUser, userMapById } from "content/user";
import type { User } from "types/User";

export default async function fetchUser(id : string | null) : Promise<User>{
  //id 없으면 비로그인 유저 반환
  if(!id) return defaultUser

  const user = userMapById.get(id)

  if(user) return user
  //id를 못 찾은 거는 Error 반환
  else throw new Error("not found User. id : " + id)
}