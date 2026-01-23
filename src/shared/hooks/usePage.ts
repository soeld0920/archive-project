// 글의 페이지수를 반환하는 훅

import { useRef, useState } from "react";

export default function usePage({PAGE_SIZE}: {PAGE_SIZE: number}){
  const [page, setPage] = useState<number>(1);
  const [pageCount, setRawPageCount] = useState<number>(1);

  const setPageCount = (count: number) => {
    setRawPageCount(Math.ceil(count / PAGE_SIZE));
  }
  
  const prevPage = () => {
    setPage(page - 1);
  }

  const nextPage = () => {
    setPage(page + 1);
  }

  return {page, setPage, pageCount, setPageCount, prevPage, nextPage} as const;
}