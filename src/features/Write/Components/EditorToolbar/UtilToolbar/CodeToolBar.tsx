import { FaObjectGroup } from "react-icons/fa";
import UtilToolBarItem from "./UtilToolBarItem";
import styles from "features/Write/styles/EditorToolbar.module.css";
import { useEditorContext } from "features/Write/context/useEditorContext";
import SelectCodeBlock from "./SelectCodeBlock";
import { useState } from "react";

export default function CodeToolBar() {
  const [selectCodeBlockActive, setSelectCodeBlockActive] = useState(false);
  const {insertExecutionTerminal, insertObjectDescription, insertCustomBox} = useEditorContext();
  return (
    <>
      <div style={{position: "relative"}}>
        <UtilToolBarItem icon={<div className={styles.codeIconBackground}>code</div>} onClick={() => setSelectCodeBlockActive(!selectCodeBlockActive)} text="코드블럭"/>
        <SelectCodeBlock active={selectCodeBlockActive} setActive={setSelectCodeBlockActive} />
      </div>
        <UtilToolBarItem icon={<div className={styles.codeIconBackground}>▷</div>} onClick={insertExecutionTerminal} text="실행터미널"/>
      <UtilToolBarItem icon={<div className={styles.codeIconBackground}><FaObjectGroup style={{fontSize : "30px"}} /></div>} onClick={insertObjectDescription} text="객체설명"/>
      <UtilToolBarItem icon={<div className={styles.codeIconBackground}></div>} onClick={insertCustomBox} text="커스텀 박스"/>
    </>
  )
}