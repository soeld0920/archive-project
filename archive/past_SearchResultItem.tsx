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

        /**/

.resultItemImg{
  width : 180px;
  height : 180px;
  border : 1px solid var(--border-color);
}

.resultItemP{
  width : 100%;
  height : 180px
}

.resultItemP.hasimage{
  width : calc(100% - 200px);
  height : 180px
}