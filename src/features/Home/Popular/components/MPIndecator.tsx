import classNames from "classnames"
import { useCurrentPageContent } from "../content/currentPage"
import styles from "styles/modules/Main/Popular.module.css"

export default function MPIndecator({pageCount} : {pageCount : number}){
  const [currentPage,setCurrentPage] = useCurrentPageContent()
  return(
    <nav>
      <ul className={styles.indicator}>
        {
          Array.from({length : pageCount}, (_,i) => i).map((i) => 
            <li key={i}>
              <button onClick={() => setCurrentPage(i)}  className={classNames([styles.indicatorItem],{[styles.current] : i == currentPage})}>
                ●
              </button>
            </li>
          )
        }
      </ul>
    </nav>
  )
}