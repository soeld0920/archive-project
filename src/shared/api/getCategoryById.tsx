import { api } from "axios/api";

export async function getCategoryById(id: number) {
  const response = await api.get(`/category/detail/${id}`);
  return response.data;
} 