import { FaRandom, FaStar } from "react-icons/fa"
import { IoTimerSharp } from "react-icons/io5"
import { Link } from "react-router-dom"
import styles from "../Header.module.css"


export function SubNav(){
  return(
    <ul className={styles.subNav} aria-label="보조 메뉴">
      <li className={styles.subNavBtn}>
        <Link to="/" title="무작위 페이지" aria-label="무작위 페이지">
          <FaRandom/>
        </Link>
      </li>
      <li className={styles.subNavBtn}>
        <Link to="/" title="인기있는 페이지" aria-label="인기있는 페이지">
          <FaStar/>
        </Link>
      </li>
      <li className={styles.subNavBtn}>
        <Link to="/" title="최근 수정된 페이지" aria-label="최근 수정된 페이지">
          <IoTimerSharp/>
        </Link>
      </li>
    </ul>
  )
}