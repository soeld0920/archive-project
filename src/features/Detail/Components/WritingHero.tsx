import { Flex } from "antd";
import CategoryBreadcrumb from "components/shared/CategoryBreadCrump";
import SeriesDropdown from "components/shared/SeriesDropdown";
import UserDropdown from "components/shared/UserDropdown";
import type { WritingDetailLoaderData } from "features/Search/types/WritingDetailLoaderData";
import { useLoaderData } from "react-router-dom";
import styles from "styles/modules/DetailPage.module.css"

export default function WritingHero(){
  const pageData : WritingDetailLoaderData = useLoaderData()
  const {UUID, mainCategory,subCategory,title, formType} = pageData.writing
  const author = pageData.author
  const {series, writingIndexs} = pageData?.seriesPayload || {}
  const pageIdx = writingIndexs?.map(w => w.UUID).indexOf(UUID) ?? -1

  return(
    <div>
      <CategoryBreadcrumb mainCategory={mainCategory} subCategory={subCategory} fallback="카테고리 없음"/>
      <h1 style={{marginBottom:"0.75rem"}} className={styles.title}>{title}</h1>
      <Flex gap={"small"}>
        작성자 : <UserDropdown userSummary={author} /> |
        {formType === "snippet" ? " 단편" : 
          <> 시리즈 : <SeriesDropdown seriesSummary={series} pageIdx={pageIdx} writingIndexs={writingIndexs}/></>
        }
      </Flex>
    </div>
  )
}