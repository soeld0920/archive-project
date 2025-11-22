import classNames from "classnames";
import { useCategoryPopupContext } from "features/Header/context/categoryPopup";
import type { SubCategory } from "shared/types/category";
import styles from "features/Header/Header.module.css";

type SelectSubItemProps = {
  item : SubCategory;
  idx : number;
}

export function SelectSubItem({item,idx} : SelectSubItemProps){
  const {active, onSubSelect} = useCategoryPopupContext();
  const isActive = active.idx === idx && active.categorySection === "sub";
  const className = classNames("navItem", styles.subCategoryNavItem ,isActive && styles.focused)

  return(
  <li> 
    <button onClick={() => onSubSelect(item)} className={className}>
      {item}
    </button>
  </li>
  )
}