import { FaLink, FaListUl, FaQuoteRight, FaTable } from "react-icons/fa";
import UtilToolBarItem from "./UtilToolBarItem";
import styles from "features/Write/styles/EditorToolbar.module.css";
import { useEditorContext } from "features/Write/context/useEditorContext";
import WritingLink from "./WritingLink";
import { useState } from "react";

export default function FormToolBar() {
  const {handleBlockquote, handleHorizontalRule, handleOrderedList, handleBulletList, insertTable} = useEditorContext();
  const [writingLinkActive, setWritingLinkActive] = useState(false);
  
  return (
    <>
      <UtilToolBarItem icon={<FaQuoteRight />} onClick={handleBlockquote} text="인용"/>
      <UtilToolBarItem icon={<div className={styles.separator} />} onClick={handleHorizontalRule} text="구분선"/>
      <div style={{position: "relative"}}>
        <UtilToolBarItem icon={<FaLink />} onClick={() => setWritingLinkActive(!writingLinkActive)} text="링크"/>
        <WritingLink active={writingLinkActive} setActive={setWritingLinkActive} />
      </div>
      <UtilToolBarItem icon={<FaListUl />} onClick={handleOrderedList} text="목록"/>
      <UtilToolBarItem icon={<FaTable />} onClick={() => {}} text="표"/>
    </>
  )
}