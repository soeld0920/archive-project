import { FaLink, FaListUl, FaQuoteRight, FaTable } from "react-icons/fa";
import UtilToolBarItem from "./UtilToolBarItem";
import styles from "features/Write/styles/EditorToolbar.module.css";
import { useEditorContext } from "features/Write/context/useEditorContext";
import WritingLink from "./WritingLink";
import { useState } from "react";
import SelectHorizontal from "./SelectHorizontal";
import { SelectListIcon } from "./SelectListIcon";
import { SelectTable } from "./SelectTable";

export default function FormToolBar() {
  const {handleBlockquote} = useEditorContext();
  const [writingLinkActive, setWritingLinkActive] = useState(false);
  const [selectHorizontalActive, setSelectHorizontalActive] = useState(false);
  const [selectListIconActive, setSelectListIconActive] = useState(false);
  const [selectTableActive, setSelectTableActive] = useState(false);
  return (
    <>
      <UtilToolBarItem icon={<FaQuoteRight />} onClick={handleBlockquote} text="인용"/>
      <div style={{position: "relative"}}>
        <UtilToolBarItem icon={<div className={styles.separator} />} onClick={() => setSelectHorizontalActive(!selectHorizontalActive)} text="구분선"/>
        <SelectHorizontal active={selectHorizontalActive} setActive={setSelectHorizontalActive} />
      </div>
      <div style={{position: "relative"}}>
        <UtilToolBarItem icon={<FaLink />} onClick={() => setWritingLinkActive(!writingLinkActive)} text="링크"/>
        <WritingLink active={writingLinkActive} setActive={setWritingLinkActive} />
      </div>
      <div style={{position: "relative"}}>
        <UtilToolBarItem icon={<FaListUl />} onClick={() => setSelectListIconActive(!selectListIconActive)} text="목록"/>
        <SelectListIcon active={selectListIconActive} setActive={setSelectListIconActive} />
      </div>
      <div style={{position: "relative"}}>
        <UtilToolBarItem icon={<FaTable />} onClick={() => setSelectTableActive(!selectTableActive)} text="표"/>
        <SelectTable active={selectTableActive} setActive={setSelectTableActive} />
      </div>
    </>
  )
}