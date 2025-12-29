import classNames from "classnames";
import styles from "features/Header/Header.module.css";
import { useCategoryContext } from "features/Header/context/categoryContext";
import { useOpenPopupContext } from "features/Header/context/openPopupContext";
import { SelectMainItem } from "./SelectMainItem";
import { useEffect } from "react";
import { api } from "axios/api";
import { useCategoryPopupContext } from "features/Header/context/categoryPopup";

export function SelectMain(){
  const [openPopup] = useOpenPopupContext();
  const [categoryState] = useCategoryContext();
  const {mainCategoryOptions, setMainCategoryOptions} = useCategoryPopupContext();
  const className = classNames(styles.panelHeader, categoryState.mainCategory && styles.showSubNav, openPopup && styles.isOpen)
  
  useEffect(() => {
    if(!openPopup) return;
    const fetchMainCategory = async () => {
      const res = await api.get("/category/main");
      setMainCategoryOptions(res.data);
    }
    fetchMainCategory();
  }, [openPopup]);

  return(
    <div className={className}>  
      <div className={styles.title}>
        <span className="highlight">대분류선택</span>
      </div>
      <ul className={styles.mainCategoryNav}>
        {
          mainCategoryOptions.map((item,i) => 
            <SelectMainItem key={item.id} item={item} idx={i} />
          )
        }
      </ul>
    </div>
  )
}