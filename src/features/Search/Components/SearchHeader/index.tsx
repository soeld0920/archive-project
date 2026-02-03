import Wrapper from "shared/components/blocks/Wrapper";
import { useSearchParams } from "react-router-dom";
import { getCategoryById } from "shared/api/getCategoryById";
import { parseUrlSearchParams } from "features/Search/libs/parseUrlSearchParams";
import { useWritingSearchResult } from "features/Search/hooks/query/useWritingSearchResult";
import { useQuery } from "@tanstack/react-query";
import { getMainCategoryById } from "shared/api/getMainCategoryById";
import ShowFilterState from "./ShowFilterState";
import SetFilterByText from "./SetFilterByText";
import { useSetDivSize } from "shared/hooks/useSetDivSize";


export default function SearchHeader(){
  const [params] = useSearchParams();
  const urlParams = parseUrlSearchParams(params);
  const {searchParams, page, sortBy} = urlParams;
  const className = "text-xl font-[Galmuri] text-gray-700 pt-2"
  const {searchDivRef} = useSetDivSize("search-header");

  const {total} = useWritingSearchResult(searchParams, page, sortBy);
  const {data : totalWritingCount, isLoading, isError, error} = total

  const {data : categoryLabel} = useQuery({
    queryKey: ["categoryLabel", searchParams],
    queryFn: async () => {
      if(searchParams.subCategoryId){
        const category = await getCategoryById(searchParams.subCategoryId);
        return category.mainCategory.name + " - " + category.subCategory.name;
      }
      else if(searchParams.mainCategoryId){
        const category = await getMainCategoryById(searchParams.mainCategoryId);
        return category.name;
      }
      else return "없음";
    }
  });

  if(isError){
    console.error(error);
  }

  return(
    <header className="w-full h-auto mt-10" ref={searchDivRef}
    style={{backgroundColor : isLoading ? "var(--color-yellow-100)" : 
      totalWritingCount === 0 || isError? "var(--color-red-100)" : "var(--color-blue-100)"}}>
      <Wrapper>
        <p className={className}>&gt; 카테고리 : {categoryLabel}</p>
        <p className={className}>&gt; 검색내용 : [ {searchParams.title} ]</p>
        <ShowFilterState className={className} />
        <p className={className}>...</p>
        {
          totalWritingCount === 0 || isLoading ? 
          <p className={className}>? 검색결과가 없습니다.</p> : 
          <p className={className}>! 총 [ <span className="text-blue-600">{totalWritingCount}</span> ] 개의 검색결과를 찾았습니다.</p>
            
        }
        <div className="flex items-center gap-2 text-xl font-[Galmuri] text-gray-700 pt-2">
          <span>&gt; </span>
          <SetFilterByText/>
        </div>
      </Wrapper>
    </header>
  )
}