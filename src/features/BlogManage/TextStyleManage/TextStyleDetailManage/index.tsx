import styles from "../../style/BlogManage.module.css";
import TextStyleList from "./TextStyleList";
import CreateTextStyle from "./CreateTextStyle";

export default function TextStyleDetailManage(){
  return(
    <li className={styles.listItem}>
      <h2 className={styles.title}>글자 스타일 관리</h2>
      <div className={styles.contentWrapper}>
        <TextStyleList />
        <CreateTextStyle />
      </div>
    </li>
  )
}