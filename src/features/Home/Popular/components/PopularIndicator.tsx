import classNames from "classnames"
import { useCurrentPageContent } from "../context/currentPage"
import styles from "features/Home/Popular/Popular.module.css"

export default function PopularIndicator(){
  const {page, setPage, pageCount} = useCurrentPageContent()
  return(
    <nav>
      <ul className={styles.indicator}>
        {
          Array.from({length : pageCount}, (_,i) => i).map((i) => 
            <li key={i}>
              <button onClick={() => setPage(i)}  className={classNames([styles.indicatorItem],{[styles.current] : i == page})}>
                ●
              </button>
            </li>
          )
        }
      </ul>
    </nav>
  )
}

