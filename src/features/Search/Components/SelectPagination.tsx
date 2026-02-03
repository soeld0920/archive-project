import { Pagination } from "antd"
import { useSearchParams } from "react-router-dom";
import { parseUrlSearchParams } from "../libs/parseUrlSearchParams";
import { useWritingSearchResult } from "../hooks/query/useWritingSearchResult";

export default function SelectPagination(){
  const [params, setParams] = useSearchParams();
  const urlParams = parseUrlSearchParams(params);
  const {page, searchParams, sortBy} = urlParams;

  const {total} = useWritingSearchResult(searchParams, page, sortBy);
  const {data : totalWritingCount} = total

  return (
    <nav className="flex justify-center mt-10">
      <Pagination align="center" current={page} 
      onChange={p => setParams((prev) => ({...prev, page: p}))} total={totalWritingCount} showSizeChanger={false}/>
    </nav>
  )
}