import { api } from "axios/api";

export const getMe = async () => {
  const response = await api.get("/user/me");
  return response.data;
}