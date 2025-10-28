import { Pagination } from "antd"
import styles from "styles/modules/Search.module.css"

type PageSelectProps = {
  page : number,
  setPage : (n : number) => void,
  total : number
}

export default function SelectPagination({page, setPage, total} :PageSelectProps){
  return (
    <nav className={styles.pagination}>
      <Pagination align="center" current={page} onChange={p => setPage(p)} total={total} showSizeChanger={false}/>
    </nav>
  )
}