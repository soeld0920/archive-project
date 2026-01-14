import { api } from "axios/api";
import { useEffect, useRef, useState } from "react";
import type { SeriesIndex } from "features/Write/types/SeriesIndex";
import { MdDelete, MdEdit } from "react-icons/md";
import commonStyles from "features/BlogManage/style/BlogManage.module.css";
import styles from "features/BlogManage/style/SeriesManage.module.css";

export default function SeriesList(){
  const [seriesList, setSeriesList] = useState<SeriesIndex[]>([]);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const fetchSeriesList = async () => {
      await api.get("/series/me/index")
      .then((res) => setSeriesList(res.data));
    }
    fetchSeriesList();
  }, []);

  useEffect(() => {
    if(seriesList.length > 5){
      listRef.current!.style.overflowY = "scroll";
    }
  }, [seriesList, listRef]);

  return(
    <ul className={commonStyles.scrollableList} ref={listRef}>
      {seriesList.length === 0 ? (
        <li className={commonStyles.scrollableListItemEmpty}>시리즈가 없습니다.</li>
      ) : (
        seriesList.map((series) => (
        <li key={series.seriesUuid} className={commonStyles.scrollableListItem}>
          <div>
            <span className={styles.seriesListItemCategory}>{series.category.name || "복합"}</span>
            <span className={styles.seriesListItemTitle}>{series.title}</span>
          </div>
          <div className={commonStyles.scrollableListItemButtons}>
            <button className={styles.seriesListItemButton} aria-label="수정"><MdEdit /></button>
            <button className={styles.seriesListItemButton} aria-label="삭제"><MdDelete /></button>
          </div>
        </li>
      ))
      )}
    </ul>
  )
}