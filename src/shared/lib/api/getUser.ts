import type { User } from "shared/types/User";
import createGetFetch from "../utils/createGetFetch";

export default async function getUser(UUID : string) : Promise<User>{
  return createGetFetch<User>(`/api/user/${UUID}`);
}