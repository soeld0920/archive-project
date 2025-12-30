import classNames from "classnames";
import { useTextStyleContext } from "features/Write/context/useTextStyleContext";
import { FaAlignCenter, FaAlignLeft, FaAlignRight } from "react-icons/fa";
import styles from "features/Write/styles/EditorToolbar.module.css";
import { useEditorContext } from "features/Write/context/useEditorContext";
import { useEffect } from "react";

export default function TextAlign() {
  const {align, setAlign} = useTextStyleContext();
  const {handleLeftAlign, handleCenterAlign, handleRightAlign, editor} = useEditorContext();

  useEffect(() => {
    if(!editor) return;
    const updateAlign = () => {
      const align =
        editor.getAttributes('paragraph').textAlign ??
        editor.getAttributes('heading').textAlign ??
        null;

      setAlign(align);
    }
    updateAlign();

    editor.on('selectionUpdate', updateAlign);
    editor.on('update', updateAlign);

    return () => {
      editor.off('update', updateAlign);
    }
  }, [editor]);
  return (
    <>
      <button onClick={() => handleLeftAlign()} className={classNames(styles.textAlignButton, align === "left" && styles.active)}>
        <FaAlignLeft/>
      </button>
      <button onClick={() => handleCenterAlign()} className={classNames(styles.textAlignButton, align === "center" && styles.active)}>
        <FaAlignCenter/>
      </button>
      <button onClick={() => handleRightAlign()} className={classNames(styles.textAlignButton, align === "right" && styles.active)}>
        <FaAlignRight/>
      </button>
    </>
  )
}