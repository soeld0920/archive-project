import styles from "features/BlogManage/style/BlogManage.module.css";
import SelectSeries from "./SelectSeries";
import WritingList from "./WritingList";

export default function WritingOrderManage(){
  
  return(
    <li className={styles.listItem}>  
      <h2 className={styles.title}>시리즈 내의 글 순서 관리</h2>
      <div className={styles.contentWrapper}>
        <SelectSeries />
        <WritingList />
      </div>
    </li>
  )
}