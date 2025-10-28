import { Flex } from "antd";
import CategoryBreadcrumb from "components/shared/CategoryBreadCrump";
import SeriesDropdown from "components/shared/SeriesDropdown";
import UserDropdown from "components/shared/UserDropdown";
import type { MainCategory, SubCategory } from "content/category"
import type { User } from "types/User";
import type { FORM_TYPE, Series, WritingIndex } from "types/Writing";

type DetailMainInfoProps = {
  mainCategory? : MainCategory;
  subCategory? : SubCategory;
  title : string;
  author : User;
  formType : FORM_TYPE;
  series? : Series;
  pageIdx? :number
  seriesWritingList? : WritingIndex[]
}
export default function WritingHero({mainCategory, subCategory, title, author, formType, series, pageIdx,seriesWritingList} : DetailMainInfoProps){
  if(formType === "series" && (!series || seriesWritingList === undefined)) return(<>시리즈이지만 제목 또는 글이 없습니다.</>)

  return(
    <div>
      <CategoryBreadcrumb mainCategory={mainCategory} subCategory={subCategory} fallback="카테고리 없음"/>
      <h2 style={{marginBottom:"0.75rem"}}>{title}</h2>
      <Flex gap={"small"}>
        작성자 : <UserDropdown userSummary={author} /> |
        {formType === "snippet" ? " 단편" : 
          <> 시리즈 : <SeriesDropdown seriesSummary={series} pageIdx={pageIdx} writingIndexs={seriesWritingList}/></>
        }
      </Flex>
    </div>
  )
}