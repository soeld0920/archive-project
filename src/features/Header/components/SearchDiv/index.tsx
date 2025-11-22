import styles from "features/Header/Header.module.css"
// import { CategoryHidden } from "./CategoryHidden";
import { SearchInput } from "./SearchInput";
import { CategoryToggle } from "./CategoryToggle";

export function SearchDiv(){
  return(
    <div className={styles.searchDiv}>
      <CategoryToggle/>
      <SearchInput/>
    </div>
  )
}
