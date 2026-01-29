
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { buildSearchParams } from "features/Header/libs/buildSearchParams";
import { useSearchCategoryStore } from "../../store/useSearchCategoryStore";
import type { SeletedCategory } from "shared/types/SeletedCategory";

// 검색창 역할
export function SearchInput(){
  const [searchText, setSearchText] = useState(""); 
  const {mainCategory, subCategory} = useSearchCategoryStore();
  const navigate = useNavigate()

  // search submit 함수
  function handleSearchSubmit(searchText : string){
    const searchParams = buildSearchParams(searchText, {mainCategory, subCategory} as SeletedCategory);
    navigate({pathname : "/search", search : searchParams})
  }

  return(
    <>
      <input type="text" placeholder="TECH.text에서 찾아보기" 
      value={searchText} 
      className="w-375/600 h-full text-lg pl-3 font-[DungGeunMo]"
      onChange={e => setSearchText(e.target.value)}
      onKeyDown={e => {if(e.key === "Enter") handleSearchSubmit(searchText)}}/>
    </>
  )
}