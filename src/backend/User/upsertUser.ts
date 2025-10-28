import { defaultUser, userList, userMapById } from "content/user";
import type { User } from "types/User";

export type upsertUserResult = {
  success : true
  mode : "created" | "updated"
  user : User
}

export default async function upsertUser(next: User) : Promise<upsertUserResult> {
  if(next === defaultUser) throw new Error("Can't upsert this user")

  const idx = userList.findIndex(u => u.UUID === next.UUID);
  let mode : "created" | "updated";
  let returnUser : User;

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
  return{success : true, mode : mode, user : returnUser}
}
