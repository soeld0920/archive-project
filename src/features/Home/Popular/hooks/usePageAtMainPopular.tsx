import usePage from "shared/hooks/usePage";
import { useFilterStateContext } from "../context/filterState";
import { useEffect } from "react";

export default function usePageAtMainPopular(){
  const {page, setPage, pageCount, setPageCount, prevPage, nextPage} = usePage();
  const {filteredWritings} = useFilterStateContext();

  useEffect(() => {
    setPageCount(Math.ceil(filteredWritings.length / 3));
  }, [filteredWritings]);

  return {page, setPage, pageCount, setPageCount, prevPage, nextPage} as const;
}