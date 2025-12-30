import { ColorPicker } from "antd";
import classNames from "classnames";
import { useEffect, useRef } from "react";
import { useEditorContext } from "features/Write/context/useEditorContext";
import { useTextStyleContext } from "features/Write/context/useTextStyleContext";
import styles from "features/Write/styles/EditorToolbar.module.css";

export default function TextStateToolbar() {
  const {bold, italic, underline, strikeout, color, highlight, setBold, setItalic, setUnderline, setStrikeout, setColor, setHighlight} = useTextStyleContext();
  const {handleBold, handleItalic, handleUnderline, handleStrike, handleTextColor, handleHighlight, editor} = useEditorContext();

  // 에디터 상태 변경 → TextStyle 상태 업데이트
  useEffect(() => {
    if (!editor) return;

    const updateState = () => {
      setBold(editor.isActive('bold'));
      setItalic(editor.isActive('italic'));
      setUnderline(editor.isActive('underline'));
      setStrikeout(editor.isActive('strike'));
      setColor(editor.getAttributes('textStyle').color);
      setHighlight(editor.getAttributes('textStyle').highlight);
    };

    // 초기 상태 설정
    updateState();

    // 에디터 상태 변경 시 업데이트
    editor.on('selectionUpdate', updateState);
    editor.on('update', updateState);

    return () => {
      editor.off('selectionUpdate', updateState);
      editor.off('update', updateState);
    };
  }, [editor, setBold, setItalic, setUnderline, setStrikeout]);


  return (
    <>
      <button onClick={() => handleBold(undefined)} className={classNames(styles.textStateButton, styles.bold, bold && styles.active)}>B</button>
      <button onClick={() => handleItalic(undefined)} className={classNames(styles.textStateButton, styles.italic, italic && styles.active)}>I</button>
      <button onClick={() => handleUnderline(undefined)} className={classNames(styles.textStateButton, styles.underline, underline && styles.active)}>U</button>
      <button onClick={() => handleStrike(undefined)} className={classNames(styles.textStateButton, styles.strikeout, strikeout && styles.active)}>S</button>
      <ColorPicker 
        onChangeComplete={(value) => {setColor(value.toHexString()); handleTextColor(value.toHexString())}} 
        value={color}>
        <div className={styles.color}>
          T
          <div className={styles.colorView} style={{background: color || "#444444"}}/>
        </div>
      </ColorPicker>
      <ColorPicker
        onChangeComplete={(value) => {setHighlight(value.toHexString()); handleHighlight(value.toHexString())}}
        value={highlight}>
        <div className={styles.highlight} style={{border: `2px solid ${highlight || "#444444"}`}}>
          T
        </div>
      </ColorPicker>
    </>
  )
}