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

export default function DetailHero(){
  const {writing} = useWritingContext()
  if(!writing) return null;
  const {mainCategoryName, subCategoryName, writingTitle, authorUuid, authorName, seriesName, seriesOrder, seriesUuid, writingUuid} = writing

  const categoryPath = subCategoryName 
    ? `${mainCategoryName} > ${subCategoryName}` 
    : mainCategoryName;

  return(
    <div>
      <CategoryBreadcrumb categoryPath={categoryPath} fallback="카테고리 없음"/>
      <h1 style={{marginBottom:"0.75rem"}} className={styles.title}>{writingTitle}</h1>
      <Flex gap={"small"}>
        작성자 : <UserDropdown userUuid={authorUuid} userName={authorName} /> |
        {seriesUuid ? (
          <> 시리즈 : <SeriesDropdown currentWritingUuid={writingUuid} seriesUuid={seriesUuid} seriesTitle={seriesName} /></>
        ) : (
          " 단편"
        )}
      </Flex>
    </div>
  )
}