// DB에 유저 정보를 삽입하거나 업데이트하는 함수
// TODO : 서버/DB의 영역으로 변경 필요.

import { defaultUser, userList, userMapById } from "mocks/database/user";
import type { User } from "shared/types/User";

export type upsertUserResult = {
  success : true
  mode : "created" | "updated"
  user : User
}

export default async function upsertUser(next: User) : Promise<upsertUserResult> {
  //비로그인에 해당하는 유저 객체가 들어왔으면 에러
  if(next === defaultUser) throw new Error("Can't upsert this user")

  const idx = userList.findIndex(u => u.UUID === next.UUID);
  let mode : "created" | "updated";
  let returnUser : User;

  //기존에 있던 유저면 업데이트, 없던 유저면 새로 생성
  if (idx >= 0) {
    userList[idx] = next;
    mode = "updated"
    returnUser = userList[idx]
  } else {
    userList.push(next);  
    mode = "created" 
    returnUser = userList[userList.length - 1]
  }
  
  userMapById.set(next.UUID, next);  
  
  //업데이트/생성된 유저 정보 반환
  return{success : true, mode : mode, user : returnUser}
}
