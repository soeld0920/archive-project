// 글의 페이지수를 반환하는 훅

import { useState } from "react";

export default function usePage(){
  const [page, setPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(1);

  const prevPage = () => {
    setPage(page - 1);
  }

  const nextPage = () => {
    setPage(page + 1);
  }

  return {page, setPage, pageCount, setPageCount, prevPage, nextPage} as const;
}