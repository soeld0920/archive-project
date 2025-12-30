import { FaObjectGroup } from "react-icons/fa";
import UtilToolBarItem from "./UtilToolBarItem";
import styles from "features/Write/styles/EditorToolbar.module.css";

export default function CodeToolBar() {
  return (
    <>
      <UtilToolBarItem icon={<div className={styles.codeIconBackground}>code</div>} onClick={() => {}} text="코드블럭"/>
      <UtilToolBarItem icon={<div className={styles.codeIconBackground}>▷</div>} onClick={() => {}} text="실행터미널"/>
      <UtilToolBarItem icon={<div className={styles.codeIconBackground}><FaObjectGroup style={{fontSize : "30px"}} /></div>} onClick={() => {}} text="객체설명"/>
      <UtilToolBarItem icon={<div className={styles.codeIconBackground}></div>} onClick={() => {}} text="커스텀 박스"/>
    </>
  )
}