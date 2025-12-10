import { useFilterStateContext } from "../../context/FilterState";
import { MAIN_SET, type MainCategory } from "shared/types/category";
import styles from "../../Recent.module.css";

export default function MainCategoryFilter() {
  const { filter, setFilterMainCategory, setFilterSubCategory } = useFilterStateContext();
  const mainOptions = Array.from(MAIN_SET.values());

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = (e.target.value || undefined) as MainCategory | undefined;
    setFilterMainCategory(value);
    // main 변경 시 sub 초기화
    if (value !== filter?.mainCategory) {
      setFilterSubCategory(undefined);
    }
  };

  return (
    <div className={styles.filterRow}>
      <label className={styles.label}>메인 카테고리</label>
      <select
        value={filter?.mainCategory ?? ""}
        onChange={handleChange}
        className={styles.select}
      >
        <option value="">선택 안함</option>
        {mainOptions.map(m => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>
    </div>
  );
}

