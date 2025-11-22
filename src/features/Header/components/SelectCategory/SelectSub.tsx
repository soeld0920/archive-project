import classNames from "classnames"
import { useCategoryContext } from "features/Header/context/categoryContext";
import styles from "features/Header/Header.module.css";
import { useMemo } from "react";
import { SUB_MAP, type MainCategory, type SubCategory } from "shared/types/category";
import { SelectSubItem } from "./SelectSubItem";

export function SelectSub(){
  const [categoryState] = useCategoryContext();

  //mainCategory가 없으면, 이 컴포를 보이게하면 안됨.
  const className = classNames(styles.subCategoryHeader, categoryState.mainCategory && styles.showSubNav);
  const label = categoryState.mainCategory ?? "";

  //mainCategory가 있으면, 그에 해당하는 subCategory를 가져옴.
  const subCategoryArray = useMemo(() => {
    const set = SUB_MAP.get(categoryState.mainCategory as MainCategory) ?? new Set<SubCategory>();
    return Array.from(set);
  }, [categoryState.mainCategory]);

  return(
    <div className={className}>  
      <div className={styles.title}>
        <span className="highlight">{label}의 소분류선택</span>
      </div>
      <ul className={styles.subCategoryNav}>
        {
          subCategoryArray.map((item,i) =>
          <SelectSubItem key={item} item={item} idx={i} />)
        }
      </ul>
    </div>
  )
}