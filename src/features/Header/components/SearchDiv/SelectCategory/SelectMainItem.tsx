import styles from "features/Header/Header.module.css";
import { useCategoryPopupContext } from "features/Header/context/categoryPopup";
import classNames from "classnames";
import { useCategoryContext } from "features/Header/context/categoryContext";
import type { MainCategory } from "shared/types/MainCategory";

type SelectMainItemProps = {
  item : MainCategory;
  idx : number;
}

export function SelectMainItem({item, idx} : SelectMainItemProps){
  const [categoryState] = useCategoryContext();
  const {active, onMainSelect, onMainHover} = useCategoryPopupContext();
  // 활성화거나, 선택되었을 경우
  const isActive = (active.idx === idx && active.categorySection === "main") 
  || (categoryState.mainCategory === item );
  const className = classNames(styles.mainCategoryNavItem ,isActive && styles.focused)
  
  return(
    <li className={className}>
      <button 
        onClick={() => onMainSelect(item, idx)} 
        onMouseEnter={() => onMainHover(idx)}
        className="navItem">
        {item.name}
      </button>
    </li>
  )
}