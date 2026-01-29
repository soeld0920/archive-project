import Wrapper from "shared/components/blocks/Wrapper";
import { useSearchStateContent } from "../../context/searchStateContext";
import { useSearchParams } from "react-router-dom";
import { getCategoryById } from "shared/api/getCategoryById";
import { useEffect, useState } from "react";
import { getMainCategoryById } from "shared/api/getMainCategoryById";
import { usePageContent } from "../../context/pageContent";
import { parseUrlSearchParams } from "features/Search/libs/parseUrlSearchParams";
import { useWritingContext } from "features/Detail/context/WritingContext";


export default function SearchHeader(){
  const [searchState] = useSearchStateContent();
  const [params] = useSearchParams();
  const searchParams = parseUrlSearchParams(params);
  const {mainCategoryId, subCategoryId, detail} = searchParams;
  const {writing} = useWritingContext();
  const [categoryLabel, setCategoryLabel] = useState<string>("");
  const className = "text-2xl font-[Galmuri] text-gray-700"

  useEffect(() => {
    const fetchCategoryPath = async () => {
      if(subCategoryId){
        const category = await getCategoryById(subCategoryId);
        setCategoryLabel(`${category.mainCategory.name} - ${category.subCategory.name}`);
      }
      else if(mainCategoryId){
        const category = await getMainCategoryById(mainCategoryId);
        setCategoryLabel(category.name);
      }else{
        setCategoryLabel("없음");
      }
    }
    fetchCategoryPath();
  }, [mainCategoryId, subCategoryId]);


  return(
    <header className="w-full h-auto mt-10"
    style={{backgroundColor : searchState === "loading" ? "oklch(94.5% 0.129 101.54)" : 
    searchState === "noResults" ? "oklch(88.5% 0.062 18.334)" : "oklch(88.2% 0.059 254.128)"}}>
      <Wrapper>
        <p className={className}>&gt; 카테고리 : {categoryLabel}</p>
        <p className={className}>&gt; 검색내용 : [ {detail} ]</p>
        <p className={className}>...</p>
        {
          searchState === "noResults" ? 
          <p className={className}>? 검색결과가 없습니다.</p> : 
          <>
            <p className={className}>! 총 [ {pageCount} ] 개의 검색결과를 찾았습니다.</p>
            <div className="flex items-center gap-2 text-2xl font-[Galmuri] text-gray-700">
              <span>&gt; </span>
              <input type="text" placeholder="추가 필터 조건이 필요하면 입력하시오..." 
              className="w-1/3 h-auto border-none outline-none"/>
            </div>
          </>
        }
      </Wrapper>
    </header>
  )
}