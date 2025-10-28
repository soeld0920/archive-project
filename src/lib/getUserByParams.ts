import fetchUser from "backend/User/fetchUser";
import { defaultUser } from "content/user";
import type { User } from "types/User";

//UUID => Writing
export async function fetchLoginUserByParams(params : URLSearchParams) : Promise<User>{
  const UUID = params.get("login")
  return fetchUser(UUID)
}