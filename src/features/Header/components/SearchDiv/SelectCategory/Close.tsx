import classNames from "classnames";
import { useOpenPopupContext } from "features/Header/context/openPopupContext";
import styles from "features/Header/Header.module.css";
import { useCategoryContext } from "features/Header/context/categoryContext";

export function Close(){
  const [openPopup,setOpenPopup] = useOpenPopupContext();
  const [categoryState] = useCategoryContext();

  const className = classNames(styles.bottomBox, categoryState.mainCategory && styles.showSubNav, openPopup && styles.isOpen)
  return(
    <div className={className} >
      <button onClick={() => setOpenPopup(false)}>닫기 ×</button>
    </div>
  )
}