import { useFilterContent } from "features/Search/context/FilterContent";
import styles from "features/Search/Search.module.css";

export default function FilterResetPanel() {
  const {resetFilters} = useFilterContent();
  return (
    <li style={{ display: "flex", justifyContent: "space-between" }}>
      <button type="button" onClick={resetFilters} className={`${styles.reloadBtn} navItem`}>
        필터 초기화
      </button>
    </li>
  );
}
