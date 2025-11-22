import styles from "features/Search/Search.module.css"

export default function NoResults(){
  return(
    <div className={styles.rightWrapper} role="status" aria-live="polite">
      <h2>결과를 찾을 수 없습니다.</h2>
      <p>검색어를 바꾸거나 필터를 조정해 보세요.</p>
    </div>
  )
}