import type { User } from "shared/types/User";
import createGetFetch from "../utils/createGetFetch";

type LoginResponse = {
  loginUser: User | null;
};

export default async function getLogin() : Promise<User | null>{
  const response = await createGetFetch<LoginResponse>(`/api/login`);
  return response.loginUser;
}