import styles from "features/Search/Search.module.css"
import AuthorFilterPanel from "./Auther"
import FormFilterPanel from "./Form"
import DateFilterPanel from "./Date"
import StatusFilterPanel from "./Status"
import FilterResetPanel from "./Reset"

export function FilterPanel(){
  return(
    <ul className={styles.filterPanel}>
      <AuthorFilterPanel/>
      <FormFilterPanel/>
      <DateFilterPanel/>
      <StatusFilterPanel/>
      <FilterResetPanel/>
    </ul>
  )
}