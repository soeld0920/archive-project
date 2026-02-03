import { useQuery } from "@tanstack/react-query";
import { getMainCategoryList } from "shared/api/getMainCategoryList";

export const useMainCategoryList = () => {
  return useQuery({
    queryKey : ["mainCategoryList"],
    queryFn : getMainCategoryList,
    staleTime : 1000 * 60 * 60 * 24,
  });
}