// 글의 페이지수를 반환하는 훅

import { useEffect } from "react";
import { useFilterContent } from "../context/FilterContent";
import usePage from "shared/hooks/usePage";

export default function usePageAtSearch(){
  const PAGE_SIZE = 10;
  const {filterState} = useFilterContent();
  const {page, setPage, pageCount, setPageCount, prevPage, nextPage} = usePage();

  //필터 바뀌면 1로 초기화
  useEffect(() => {
    setPage(1);
  },[filterState])

  return {page, setPage, pageCount, prevPage, nextPage, PAGE_SIZE, setPageCount} as const;
}