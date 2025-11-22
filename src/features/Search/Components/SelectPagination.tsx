import { Pagination } from "antd"
import styles from "features/Search/Search.module.css"
import { usePageContent } from "../context/pageContent";

export default function SelectPagination(){
  const {page, setPage, pageCount, PAGE_SIZE} = usePageContent();
  return (
    <nav className={styles.pagination}>
      <Pagination align="center" current={page} 
      onChange={p => setPage(p)} total={pageCount * PAGE_SIZE} showSizeChanger={false}/>
    </nav>
  )
}