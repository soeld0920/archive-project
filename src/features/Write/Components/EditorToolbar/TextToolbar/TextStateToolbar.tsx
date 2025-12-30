import { ColorPicker } from "antd";
import classNames from "classnames";
import { useEditorContext } from "features/Write/context/useEditorContext";
import { useTextStyleContext } from "features/Write/context/useTextStyleContext";
import styles from "features/Write/styles/EditorToolbar.module.css";

export default function TextStateToolbar() {
  const {bold, italic, underline, strikeout, color, highlight, toggleBold, toggleItalic, toggleUnderline, toggleStrike, setColor, setHighlight} = useTextStyleContext();
  const {handleBold, handleItalic, handleUnderline, handleStrike, handleTextColor, handleHighlight} = useEditorContext();

  return (
    <>
      <button onClick={() => {handleBold(); toggleBold()}} className={classNames(styles.textStateButton, styles.bold, bold && styles.active)}>B</button>
      <button onClick={toggleItalic} className={classNames(styles.textStateButton, styles.italic, italic && styles.active)}>I</button>
      <button onClick={toggleUnderline} className={classNames(styles.textStateButton, styles.underline, underline && styles.active)}>U</button>
      <button onClick={toggleStrike} className={classNames(styles.textStateButton, styles.strikeout, strikeout && styles.active)}>S</button>
      <ColorPicker onOpenChange={(open) => {if(open) setColor(null)}} onChangeComplete={(value) => {setColor(value.toHexString())}} value={color}>
        <div className={styles.color}>
          T
          <div className={styles.colorView} style={{background: color || "#444444"}}/>
        </div>
      </ColorPicker>
      <ColorPicker onOpenChange={(open) => {if(open) setHighlight(null)}} onChangeComplete={(value) => {setHighlight(value.toHexString())}} value={highlight}>
        <div className={styles.highlight} style={{border: `2px solid ${highlight || "#444444"}`}}>
          T
        </div>
      </ColorPicker>
    </>
  )
}