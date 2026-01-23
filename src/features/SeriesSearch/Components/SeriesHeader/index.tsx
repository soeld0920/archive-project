import { useSearchParams } from "react-router-dom";
import styles from "features/Search/Search.module.css"
import Wrapper from "shared/components/blocks/Wrapper";
import CategoryBreadcrumb from "shared/components/features/CategoryBreadCrump";
import SeriesSortSelect from "./SeriesSortSelect";
import SeriesResultSummary from "./SeriesResultSummary";

export default function SeriesHeader(){
  const [params] = useSearchParams();
  const seriesUuid = params.get("detail");
  
  return(
    <header className={styles.header} style={{height:"auto"}}>
      <Wrapper className="flexBlock">
        <div>
          <CategoryBreadcrumb categoryPath="시리즈 검색" />
          <SeriesResultSummary seriesUuid={seriesUuid || ""}/>
        </div>
        <form aria-label="시리즈 검색 결과 정렬" style={{display:"flex",alignItems:"center"}}>
          <SeriesSortSelect/>
        </form>
      </Wrapper>
    </header>
  )
}
