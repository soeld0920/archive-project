// 글의 페이지수를 반환하는 훅

import { useEffect, useState } from "react";
import { useWritingsContent } from "../context/writingsContent";
import { useFilterContent } from "../context/FilterContent";

export default function usePage(){
  const PAGE_SIZE = 10;
  const [writings] = useWritingsContent();
  const {filterState} = useFilterContent();
  const [page, setPage] = useState<number>(1);
  const pageCount = Math.ceil(writings.length / PAGE_SIZE);

  const prevPage = () => {
    setPage(page - 1);
  }

  const nextPage = () => {
    setPage(page + 1);
  }

  useEffect(() => {
    setPage(1);
  },[filterState])

  return {page, setPage, pageCount, prevPage, nextPage, PAGE_SIZE} as const;
}