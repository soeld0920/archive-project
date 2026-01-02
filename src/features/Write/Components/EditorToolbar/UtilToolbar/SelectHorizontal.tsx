import classNames from "classnames";
import { useEditorContext } from "features/Write/context/useEditorContext";
import styles from "features/Write/styles/EditorToolbar.module.css";

type SelectHorizontalProps = {
  active: boolean;
  setActive: (active: boolean) => void;
}

export default function SelectHorizontal({ active, setActive }: SelectHorizontalProps) {
  const {handleHorizontalRule} = useEditorContext();


  return (
    <ul className={classNames(styles.selectHorizontalWrapper, { [styles.selectHorizontalWrapperActive]: active })}>
      <li>
        <button className={styles.selectHorizontalItem} onClick={() => {handleHorizontalRule("long"); setActive(false)}}>
          <div className={styles.selectHorizontalItemIcon1}/>
        </button>
      </li>
      <li>
        <button className={styles.selectHorizontalItem} onClick={() => {handleHorizontalRule("short"); setActive(false)}}>
        <div className={styles.selectHorizontalItemIcon2}/>
        </button>
      </li>
      <li>
        <button className={styles.selectHorizontalItem} onClick={() => {handleHorizontalRule("think"); setActive(false)}}>
        <div className={styles.selectHorizontalItemIcon3}/>
        </button>
      </li>
    </ul>
  );
}