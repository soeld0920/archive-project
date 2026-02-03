import { useSearchParams } from "react-router-dom";
import { parseUrlSearchParams } from "../libs/parseUrlSearchParams";
import { SORT_OPTION } from "../types/searchSortStandard";

export default function SelectSortBy(){
  const [params, setParams] = useSearchParams();
  const urlParams = parseUrlSearchParams(params);
  const {sortBy} = urlParams;
  return (
    <ul className="flex gap-5 justify-end pb-5">
      {SORT_OPTION.map((option) => (
        <li key={option}>
          <button 
          className="navItem text-2xl bg-none border-none outline-none"
          style={{color : sortBy === option ? "var(--color-text-highlight)" : undefined}}
          onClick={() => setParams((prev) => {
            prev.set("sortBy", option);
            return prev;
          })}>
            {option}
          </button>
        </li>
      ))}
    </ul>
  )
}