import { FaLink, FaListUl, FaQuoteRight, FaTable } from "react-icons/fa";
import UtilToolBarItem from "./UtilToolBarItem";
import styles from "features/Write/styles/EditorToolbar.module.css";

export default function FormToolBar() {
  return (
    <>
      <UtilToolBarItem icon={<FaQuoteRight />} onClick={() => {}} text="인용"/>
      <UtilToolBarItem icon={<div className={styles.separator} />} onClick={() => {}} text="구분선"/>
      <UtilToolBarItem icon={<FaLink />} onClick={() => {}} text="링크"/>
      <UtilToolBarItem icon={<FaListUl />} onClick={() => {}} text="목록"/>
      <UtilToolBarItem icon={<FaTable />} onClick={() => {}} text="표"/>
    </>
  )
}