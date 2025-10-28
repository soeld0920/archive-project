import classNames from "classnames/bind"
import { SubP } from "components/shared/SubSpan"
import type { FuseResult } from "fuse.js"
import millify from "millify"
import { createSearchParams, Link } from "react-router-dom"
import styles from "styles/modules/Search.module.css"
import type { WritingIndex } from "types/Writing"

type SearchResultsListProps = {
  results : FuseResult<WritingIndex>[],
  page :number,
}

export default function SearchResultsList({results,page} : SearchResultsListProps) {
  const showResults = results.slice((page - 1) * 10, page * 10);
  return(
    <ol className={styles.rightWrapper}  aria-label="검색 결과 목록" start={(page - 1) * 10 + 1}>
      {
        showResults.map(r => (
          <SearchResultItem key={r.item.UUID} r={r}/>
        ))
      }
    </ol>
  )
}

function SearchResultItem({r} : {r : FuseResult<WritingIndex>}){
  const item = r.item;
  const cx = classNames.bind(styles)
  return(
    <li>
      <article className={styles.resultItem}>
        {
        item.image &&
        <div className={styles.resultItemImg}>
          <img src={item.image} alt="글의 이미지"/>
        </div>
        }
          <div className={cx('resultItemP',r.item.image && 'hasimage')}>
            <SubP>{item.mainCategory  + ">" + item.subCategory}</SubP>
            <h3 style={{margin : 0, marginBottom : "10px"}}>
              <Link to={`/page?${createSearchParams({UUID : item.UUID})}`}>{item.title}</Link>
            </h3>
            <p><Link to={`/user/${r.item.authorName}`}>{item.authorName}</Link> | {item.date} | {item.formType === "snippet" ? "단편" : <Link to={`/sereis/${item.seriesUUID}`}>{r.item.seriesTitle}</Link>}</p>
            <p style={{marginBottom : "10px"}}>조회수 {millify(item.view, { precision: 1 })} | 좋아요 : {millify(item.great, { precision: 1 })} | 댓글 : {item.commentCount}</p>
            <SubP className={styles.clamp2}>{item.content}</SubP>
          </div>
      </article>
      </li>
  )
}