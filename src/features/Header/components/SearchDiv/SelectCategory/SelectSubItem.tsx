import classNames from "classnames";
import { useCategoryPopupContext } from "features/Header/context/categoryPopup";
import styles from "features/Header/Header.module.css";
import type { SubCategory } from "shared/types/MainCategory";

type SelectSubItemProps = {
  item : SubCategory;
  idx : number;
}

export function SelectSubItem({item,idx} : SelectSubItemProps){
  const {active, onSubSelect, onSubHover} = useCategoryPopupContext();
  const isActive = active.idx === idx && active.categorySection === "sub";
  const className = classNames("navItem", styles.subCategoryNavItem ,isActive && styles.focused)

  return(
  <li> 
    <button 
      onClick={() => onSubSelect(item, idx)} 
      onMouseEnter={() => onSubHover(idx)}
      className={className}>
      {item.name}
    </button>
  </li>
  )
}