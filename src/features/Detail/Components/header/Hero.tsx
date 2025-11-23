/*
  글 헤더 컴포넌트
  - 글 제목
  - 작성자 정보 및 시리즈 정보 드롭다운
*/

import { Flex } from "antd";
import CategoryBreadcrumb from "shared/components/features/CategoryBreadCrump";
import SeriesDropdown from "shared/components/features/SeriesDropdown";
import UserDropdown from "shared/components/features/UserDropdown";
import styles from "features/Detail/DetailPage.module.css"
import { useWritingContext } from "features/Detail/context/WritingContext";

export default function WritingHero(){
  const {writing, author, series} = useWritingContext()
  if(writing === null || author === null) return null;
  const {UUID, mainCategory,subCategory,title, formType} = writing
  const pageIdx = series?.WritingList?.indexOf(UUID) ?? -1

  return(
    <div>
      <CategoryBreadcrumb mainCategory={mainCategory} subCategory={subCategory} fallback="카테고리 없음"/>
      <h1 style={{marginBottom:"0.75rem"}} className={styles.title}>{title}</h1>
      <Flex gap={"small"}>
        작성자 : <UserDropdown userSummary={author} /> |
        {formType === "snippet" ? " 단편" : 
          <> 시리즈 : <SeriesDropdown seriesSummary={series} pageIdx={pageIdx} writingIndexs={pageIdx}/></>
        }
      </Flex>
    </div>
  )
}