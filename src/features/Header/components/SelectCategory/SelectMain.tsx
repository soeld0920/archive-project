import classNames from "classnames";
import styles from "features/Header/Header.module.css";
import { useCategoryContext } from "features/Header/context/categoryContext";
import { useOpenPopupContext } from "features/Header/context/openPopupContext";
import { categories } from "shared/types/category";
import { SelectMainItem } from "./SelectMainItem";

export function SelectMain(){
  const [openPopup] = useOpenPopupContext();
  const [categoryState] = useCategoryContext();
  const className = classNames(styles.panelHeader, categoryState.mainCategory && styles.showSubNav, openPopup && styles.isOpen)
  return(
    <div className={className}>  
      <div className={styles.title}>
        <span className="highlight">대분류선택</span>
      </div>
      <ul className={styles.mainCategoryNav}>
        {
          categories.map((item,i) => 
            <SelectMainItem key={i} item={item.text} idx={i} />
          )
        }
      </ul>
    </div>
  )
}