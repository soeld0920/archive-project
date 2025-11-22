// DB에서 id에 해당하는 유저 정보를 가져오는 함수
// TODO : 서버/DB의 영역으로 변경 필요.

import { defaultUser, userMapById } from "mocks/database/user";
import type { User } from "shared/types/User";

export default async function fetchUser(id : string | null) : Promise<User>{
  //id 없으면 비로그인 유저 반환
  if(!id) return defaultUser

  const user = userMapById.get(id)

  if(user) return user
  //id를 못 찾은 거는 Error 반환
  else throw new Error("not found User. id : " + id)
}