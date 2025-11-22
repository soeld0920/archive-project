import type { MainCategory } from "shared/types/category";
import styles from "features/Header/Header.module.css";
import { useCategoryPopupContext } from "features/Header/context/categoryPopup";
import classNames from "classnames";
import { useCategoryContext } from "features/Header/context/categoryContext";

type SelectMainItemProps = {
  item : MainCategory;
  idx : number;
}

export function SelectMainItem({item,idx} : SelectMainItemProps){
  const [categoryState] = useCategoryContext();
  const {active, onMainSelect} = useCategoryPopupContext();
  // 활성화거나, 선택되었을 경우
  const isActive = (active.idx === idx && active.categorySection === "main") 
  || (categoryState.mainCategory === item );
  const className = classNames(styles.mainCategoryNavItem ,isActive && styles.focused)
  
  return(
    <li className={className}>
      <button onClick={() => onMainSelect(item)} className="navItem">
        {item}
      </button>
    </li>
  )
}