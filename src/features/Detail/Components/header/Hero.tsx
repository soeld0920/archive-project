/*
  글 헤더 컴포넌트
  - 글 제목
  - 작성자 정보 및 시리즈 정보 드롭다운
*/

import { Flex } from "antd";
import CategoryBreadcrumb from "shared/components/features/CategoryBreadCrump";
import SeriesDropdown from "shared/components/features/SeriesDropdown";
import UserDropdown from "shared/components/features/UserDropdown";
import { useWritingDetail } from "features/Detail/hooks/query/useWritingDetail.tsx";
import { useParams } from "react-router-dom";

export default function DetailHero(){
  const {UUID} = useParams();

  const {data : writingDetail, error, isLoading, isError} = useWritingDetail(UUID ?? "")

  if(isError || isLoading) {console.error(error); return null;}

  const {mainCategoryName, subCategoryName, writingTitle, authorUuid, authorName, seriesName, seriesUuid, writingUuid} = writingDetail

  const categoryPath = subCategoryName 
    ? `${mainCategoryName} > ${subCategoryName}` 
    : mainCategoryName;

  return(
    <div>
      <CategoryBreadcrumb categoryPath={categoryPath} fallback="카테고리 없음"/>
      <h1 className="mb-2 text-3xl font-[Galmuri]">{writingTitle}</h1>
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