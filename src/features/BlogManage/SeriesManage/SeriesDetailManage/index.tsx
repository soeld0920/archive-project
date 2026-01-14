import styles from "features/BlogManage/style/BlogManage.module.css";
import SeriesList from "./SeriesList";
import CreateSeries from "./CreateSeries";

export default function SeriesDetailManage(){
  
  
  return(
    <li className={styles.listItem}>
      <h2 className={styles.title}>시리즈 관리</h2>
      <div className={styles.contentWrapper}>
        <SeriesList />
        <CreateSeries />
      </div>
    </li>
  )
}