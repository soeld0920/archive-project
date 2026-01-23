// 유저 글의 페이지수를 반환하는 훅

import { useEffect } from "react";
import usePage from "shared/hooks/usePage";

export default function usePageAtBlogSearch(){
  const PAGE_SIZE = 10;
  const {page, setPage, pageCount, setPageCount, prevPage, nextPage} = usePage({PAGE_SIZE});

  // 페이지 초기화는 필요시 외부에서 처리
  return {page, setPage, pageCount, prevPage, nextPage, PAGE_SIZE, setPageCount} as const;
}
