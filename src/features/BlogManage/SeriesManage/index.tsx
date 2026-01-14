import styles from "../style/BlogManage.module.css";
import SeriesDetailManage from "./SeriesDetailManage";
import WritingOrderManage from "./WritingOrderManage";
import { SeriesProvider } from "./WritingOrderManage/context/useSeries";

export default function SeriesManage(){
  return(
    <SeriesProvider>
      <ul className={styles.list}>
        <SeriesDetailManage />
        <WritingOrderManage />
      </ul>
    </SeriesProvider>
  )
}