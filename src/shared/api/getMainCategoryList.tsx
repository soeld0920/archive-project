import { api } from "axios/api";

export async function getMainCategoryList(){
  const response = await api.get("/category/main");
  return response.data;
}