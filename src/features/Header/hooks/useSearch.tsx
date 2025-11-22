import { useNavigate } from "react-router-dom";
import { useCategoryContext } from "../context/categoryContext";
import { buildSearchParams } from "../libs/buildSearchParams";

export function useSearch(){
  const [categoryState] = useCategoryContext();
  const navigate = useNavigate()

  // search submit 함수
  function handleSearchSubmit(searchText : string){
    const searchParams = buildSearchParams(searchText, categoryState);
    navigate({pathname : "/search", search : searchParams})
  }

  return {handleSearchSubmit}
}