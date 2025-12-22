import classNames from "classnames"
import { useCategoryContext } from "features/Header/context/categoryContext";
import styles from "features/Header/Header.module.css";
import { useEffect } from "react";
import { SelectSubItem } from "./SelectSubItem";
import { api } from "axois/api";
import { useCategoryPopupContext } from "features/Header/context/categoryPopup";

export function SelectSub(){
  const [categoryState] = useCategoryContext();
  const {subCategoryOptions, setSubCategoryOptions} = useCategoryPopupContext();

  //mainCategory가 없으면, 이 컴포를 보이게하면 안됨.
  const className = classNames(styles.subCategoryHeader, categoryState.mainCategory && styles.showSubNav);
  const label = categoryState.mainCategory?.name ?? "";

  //mainCategory가 있으면, 그에 해당하는 subCategory를 가져옴.
  useEffect(() => {
    if(!categoryState.mainCategory) return;
    const fetchSubCategory = async () => {
      const res = await api.get(`/category/sub/${categoryState.mainCategory?.id}`);
      setSubCategoryOptions(res.data);
    }
    fetchSubCategory();
  }, [categoryState.mainCategory]);

  return(
    <div className={className}>  
      <div className={styles.title}>
        <span className="highlight">{label}의 소분류선택</span>
      </div>
      <ul className={styles.subCategoryNav}>
        {
          subCategoryOptions.map((item,i) =>
          <SelectSubItem key={item.id} item={item} idx={i} />)
        }
      </ul>
    </div>
  )
}