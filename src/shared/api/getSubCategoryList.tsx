import { api } from "axios/api";

export const getSubCategoryList = async (mainCategoryIndex : number) => {
  const response = await api.get(`/category/sub/${mainCategoryIndex}`);
  return response.data;
}