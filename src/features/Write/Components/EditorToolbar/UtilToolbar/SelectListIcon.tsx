import { useEditorContext } from "features/Write/context/useEditorContext";
import { FaListOl, FaListUl } from "react-icons/fa";
import styles from "features/Write/styles/EditorToolbar.module.css";
import classNames from "classnames";

type SelectListIconProps = {
  active: boolean;
  setActive: (active: boolean) => void;
}


export function SelectListIcon({ active, setActive }: SelectListIconProps){
  const {handleOrderedList, handleBulletList} = useEditorContext();
  return(
    <ul className={classNames(styles.selectListIconWrapper, { [styles.selectListIconWrapperActive]: active })}>
      <li>
        <button onClick={() => {handleOrderedList(); setActive(false)}} className={styles.selectListIconItem}>
          <FaListOl/>
        </button>
      </li>
      <li>
        <button onClick={() => {handleBulletList(); setActive(false)}} className={styles.selectListIconItem}>
          <FaListUl/>
        </button>
      </li>
    </ul>
  )
}