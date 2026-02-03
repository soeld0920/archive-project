import { api } from "axios/api";

export const getWritingDetail = async (writingUuid : string) => {
  const response = await api.get(`/writing/${writingUuid}`);
  return response.data;
}