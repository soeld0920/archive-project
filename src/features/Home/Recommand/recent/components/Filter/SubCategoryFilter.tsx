import { useFilterStateContext } from "../../context/FilterState";
import { SUB_MAP, type SubCategory } from "shared/types/category";
import styles from "../../Recent.module.css";

export default function SubCategoryFilter() {
  const { filter, setFilterSubCategory } = useFilterStateContext();
  const mainCategory = filter?.mainCategory;
  const subOptions = mainCategory ? Array.from(SUB_MAP.get(mainCategory) ?? []) : [];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = (e.target.value || undefined) as SubCategory | undefined;
    setFilterSubCategory(value);
  };

  return (
    <div className={styles.filterRow}>
      <label className={styles.label}>서브 카테고리</label>
      <select
        value={filter?.subCategory ?? ""}
        onChange={handleChange}
        disabled={!mainCategory}
        className={styles.select}
      >
        <option value="">선택 안함</option>
        {subOptions.map(s => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
    </div>
  );
}

