import classNames from "classnames/bind"
import millify from "millify"
import { Link } from "react-router-dom"
import styles from "features/Search/Search.module.css"
import type { WritingIndex } from "shared/types/entity/Writing"
import { useWritingsContent } from "../context/writingsContent"
import { usePageContent } from "../context/pageContent"
import defaultImage from "assets/img/basic-icons.png"
import { parseNormalizerDate } from "shared/lib/utils/parseNormalizerDate"


export default function SearchResultsList() {
  const [writings] = useWritingsContent();
  const {page} = usePageContent();
  return(
    <ol className={styles.rightWrapper}  aria-label="검색 결과 목록" start={(page - 1) * 10 + 1}>
      {
        writings.map(r => (
          <SearchResultItem key={r.writingUuid} item={r}/>
        ))
      }
    </ol>
  )
}

function SearchResultItem({item} : {item : WritingIndex}){
  const cx = classNames.bind(styles)
  return(
    <li>
      <article className={styles.resultItem}>
        <div className={styles.resultItemImg}>
          <img src={item.image ?? defaultImage} alt="글의 이미지"/>
        </div>
        <div className={cx('resultItemP',item.image && 'hasimage')}>
          <p className="Subspan">{item.mainCategoryName  + ">" + item.subCategoryName}</p>
          <h3 style={{margin : 0, marginBottom : "10px"}}>
            <Link to={`/writing/${item.writingUuid}`}>{item.writingTitle}</Link>
          </h3>
          <p><Link to={`/user/${item.authorName}`}>{item.authorName}</Link> | {parseNormalizerDate(item.createAt)} | {item.seriesName ? <Link to={`/sereis/${item.seriesUUID}`}>{item.seriesName}</Link> : "단편"}</p>
          <p style={{marginBottom : "10px"}}>조회수 {millify(item.view, { precision: 1 })} | 좋아요 : {millify(item.great, { precision: 1 })} | 댓글 : {item.commentCount}</p>
          <p className={styles.clamp2}>{item.content}</p>
        </div>
      </article>
      </li>
  )
}