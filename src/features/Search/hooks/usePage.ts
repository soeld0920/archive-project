// 글의 페이지수를 반환하는 훅

import { useEffect } from "react";
import { useWritingsContent } from "../context/writingsContent";
import { useFilterContent } from "../context/FilterContent";
import usePage from "shared/hooks/usePage";

export default function usePageAtSearch(){
  const PAGE_SIZE = 10;
  const [writings] = useWritingsContent();
  const {filterState} = useFilterContent();
  const {page, setPage, pageCount, setPageCount, prevPage, nextPage} = usePage();

  // pageCount 업데이트
  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(writings.length / PAGE_SIZE));
    setPageCount(totalPages);
  }, [writings.length, PAGE_SIZE, setPageCount]);

  //필터 바뀌면 1로 초기화
  useEffect(() => {
    setPage(1);
  },[filterState])

  return {page, setPage, pageCount, prevPage, nextPage, PAGE_SIZE} as const;
}