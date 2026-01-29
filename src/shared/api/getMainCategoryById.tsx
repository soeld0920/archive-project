import { api } from "axios/api";

export async function getMainCategoryById(id: number) {
  const response = await api.get(`/category/detail/main/${id}`);
  return response.data;
} 