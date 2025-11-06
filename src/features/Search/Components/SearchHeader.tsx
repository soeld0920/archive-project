import type {  SearchParams } from "content/category";
import type { FuseResult } from "fuse.js";
import type { WritingIndex } from "types/Writing";
import { SORT_OPTION, type SearchSortStandard } from "../types/searchSortStandard";
import styles from "styles/modules/Search.module.css"
import { SubP } from "components/shared/SubSpan";
import ErrorSpan from "components/shared/ErrorSpan";
import { HighlightSpan } from "components/shared/HighlightSpan";
import CategoryBreadcrumb from "components/shared/CategoryBreadCrump";
import Wrapper from "components/blocks/Wrapper";

type SearchHeaderProps = {
  variant : "error" | "default",
  query : SearchParams,
  results : FuseResult<WritingIndex>[];
  page : number;
  sortStandard : SearchSortStandard;
  setSortStandard : (s : SearchSortStandard) => void;
}

export default function SearchHeader({variant, query,results,page,sortStandard,setSortStandard} : SearchHeaderProps){
  const {mainCategory, subCategory, detail} = query;
  
  return(
    <header className={styles.header}>
      <Wrapper className="flexBlock">
        <div>
          <CategoryBreadcrumb mainCategory={mainCategory} subCategory={subCategory} />
          <ResultSummary detail={detail} page={page} total={results.length} variant={variant}/>
        </div>
        <form aria-label="검색 결과 정렬" style={{display:"flex",alignItems:"center"}}>
          <SortSelect className={styles.sortWrapper} sortStandard={sortStandard} setSortStandard={setSortStandard}/>
        </form>
      </Wrapper>
    </header>
  )
}

type ResultSummaryProps = {
  variant : "default" | "error"
  detail : string;
  page : number;
  total : number;
}

function ResultSummary({variant, detail, page, total} : ResultSummaryProps){
  if(variant === "error")
    return(
      <p role="status" aria-live="polite">
        <ErrorSpan>{detail}</ErrorSpan>에 대한 결과를 찾을 수 없습니다.
      </p>
    )

  const totalPages = Math.ceil(total / 10)
  return(
    <div role="status" aria-live="polite" style={{display : "flex"}}>
      <p><HighlightSpan>{detail}</HighlightSpan>에 대한 결과입니다.</p> 
      <SubP>총 <HighlightSpan>{total.toLocaleString()}</HighlightSpan>개의 결과를 찾았습니다. 페이지 <HighlightSpan>{page}</HighlightSpan> / {totalPages}</SubP>
    </div>
  )
}

type SortSelectProps = {
  className : string;
  sortStandard : SearchSortStandard;
  setSortStandard : (s : SearchSortStandard) => void;

}

function SortSelect({className, sortStandard, setSortStandard} : SortSelectProps){
  return(
    <select className={className} onChange={(e) => setSortStandard(e.target.value as SearchSortStandard)} value={sortStandard}>
      {
        SORT_OPTION.map((s) => (
          <option value={s} key={s}>{s}</option>
        ))
      }
    </select>
  )
}