import classNames from "classnames";
import { useTextStyleContext } from "features/Write/context/useTextStyleContext";
import { FaAlignCenter, FaAlignLeft, FaAlignRight } from "react-icons/fa";
import styles from "features/Write/styles/EditorToolbar.module.css";

export default function TextAlign() {
  const {align, setAlign} = useTextStyleContext();
  return (
    <>
      <button onClick={() => setAlign("left")} className={classNames(styles.textAlignButton, align === "left" && styles.active)}>
        <FaAlignLeft/>
      </button>
      <button onClick={() => setAlign("center")} className={classNames(styles.textAlignButton, align === "center" && styles.active)}>
        <FaAlignCenter/>
      </button>
      <button onClick={() => setAlign("right")} className={classNames(styles.textAlignButton, align === "right" && styles.active)}>
        <FaAlignRight/>
      </button>
    </>
  )
}