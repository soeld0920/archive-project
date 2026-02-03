import useSearchFilter from "../../hooks/useSearchFilter";
import { useMemo } from "react";

export default function ShowFilterState({className} : {className : string}){
  const {filter} = useSearchFilter();
  const {author, dateRange, viewRange, greatRange} = filter;

  const label = useMemo(() => {
    const parts = [];
    if (author) parts.push(`author : ${author}`);
    if (dateRange.from || dateRange.to) parts.push(`date : ${dateRange.from ?? ""} ~ ${dateRange.to ?? ""}`);
    if (viewRange.min || viewRange.max) parts.push(`view : ${viewRange.min ?? ""} ~ ${viewRange.max ?? ""}`);
    if (greatRange.min || greatRange.max) parts.push(`like : ${greatRange.min ?? ""} ~ ${greatRange.max ?? ""}`);
    return parts.join(", ");
  }, [author, dateRange, viewRange, greatRange]);

  if(label.trim() === "") return null;
  return (
    <p className={className}>&gt; 필터 : [ {label} ]</p>
  );
}