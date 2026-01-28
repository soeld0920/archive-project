import { useOpenPopupContext } from "features/Header/context/openPopupContext";
import { SelectMain } from "./SelectMain";
import { SelectSub } from "./SelectSub";
import { Close } from "./Close";
import classNames from "classnames";
import styles from "features/Header/Header.module.css";
import { useCategoryContext } from "features/Header/context/categoryContext";
import { useCategoryPopupContext } from "features/Header/context/categoryPopup";

export function SelectCategory(){
  const [openPopup] = useOpenPopupContext();
  const [categoryState] = useCategoryContext();
  const {panelRef} = useCategoryPopupContext();
  const className = classNames(styles.categoryHidden, categoryState.mainCategory && styles.showSubNav, openPopup && styles.isOpen)

  return(
    <div ref={panelRef} className={className}>
      <div style={{display:"flex", height : "400px"}}>
        <SelectMain />
        <SelectSub />
      </div>
      <Close />
    </div>
  )
}