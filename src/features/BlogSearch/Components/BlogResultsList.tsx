import classNames from "classnames/bind"
import millify from "millify"
import { Link } from "react-router-dom"
import styles from "features/Search/Search.module.css"
import type { WritingIndex } from "shared/types/entity/Writing"
import { useBlogWritingsContent } from "../context/BlogWritingsContext"
import { useBlogPageContent } from "../context/BlogPageContext"
import defaultImage from "assets/img/basic-icons.png"
import { parseNormalizerDate } from "shared/lib/utils/parseNormalizerDate"


export default function BlogResultsList() {
  const [writings] = useBlogWritingsContent();
  const {page} = useBlogPageContent();
  return(
    <ol className={styles.rightWrapper}  aria-label="블로그 글 목록" start={(page - 1) * 10 + 1}>
      {
        writings.map(r => (
          <BlogResultItem key={r.writingUuid} item={r}/>
        ))
      }
    </ol>
  )
}

function BlogResultItem({item} : {item : WritingIndex}){
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
          <p><Link to={`/user/${item.authorName}`}>{item.authorName}</Link> | {parseNormalizerDate(item.createAt)} | {item.seriesName ? <Link to={`/series/${item.seriesUUID}`}>{item.seriesName}</Link> : "단편"}</p>
          <p style={{marginBottom : "10px"}}>조회수 {millify(item.view, { precision: 1 })} | 좋아요 : {millify(item.great, { precision: 1 })} | 댓글 : {item.commentCount}</p>
          <p className={styles.clamp2}>{item.content}</p>
        </div>
      </article>
      </li>
  )
}
