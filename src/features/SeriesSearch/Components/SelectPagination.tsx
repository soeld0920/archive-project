import { Pagination } from "antd"
import styles from "features/Search/Search.module.css"
import { useSeriesPageContent } from "../context/SeriesPageContext";

export default function SelectPagination(){
  const {page, setPage, pageCount, PAGE_SIZE} = useSeriesPageContent();
  return (
    <nav className={styles.pagination}>
      <Pagination align="center" current={page} 
      onChange={p => setPage(p)} total={pageCount * PAGE_SIZE} showSizeChanger={false}/>
    </nav>
  )
}
