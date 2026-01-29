import { SORT_OPTION, type SearchSortStandard } from "features/Search/types/searchSortStandard";
import styles from "features/Search/Search.module.css";
import { useSortContent } from "features/Search/context/sortContent";


export default function SortSelect(){
  const [sortStandard, setSortStandard] = useSortContent();
  return(
    <select className={styles.sortWrapper} 
    onChange={(e) => setSortStandard(e.target.value as SearchSortStandard)} 
    value={sortStandard}
    aria-label="검색 결과 정렬 기준 선택">
      {
        SORT_OPTION.map((s) => (
          <option value={s} key={s}>{s}</option>
        ))
      }
    </select>
  )
}