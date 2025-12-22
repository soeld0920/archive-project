import { useCategoryContext } from "features/Header/context/categoryContext";
import { useCategoryPopupContext } from "features/Header/context/categoryPopup";
import { useOpenPopupContext } from "features/Header/context/openPopupContext";
import styles from "features/Header/Header.module.css";

export function CategoryToggle(){
  const [categoryState] = useCategoryContext();
  const {toggleRef} = useCategoryPopupContext();
  const [openPopup,SetOpenpopup] = useOpenPopupContext();
  
  const label = categoryState.mainCategory?.name || "전체보기";

  return(
    <button className={styles.searchCategory} onClick={() => SetOpenpopup(!openPopup)} aria-expanded={openPopup} 
    aria-controls="category-popover" aria-haspopup="dialog" type="button" ref={toggleRef}>
      <span className={styles.categoryText}>{label}</span>
      <span className={styles.subcategoryText}>{categoryState.subCategory?.name}</span>
    </button>
  )
}