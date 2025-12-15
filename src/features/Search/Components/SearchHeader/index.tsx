import { parseUrlSearchParams } from "features/Search/libs/parseUrlSearchParams";
import { useSearchParams } from "react-router-dom";
import styles from "features/Search/Search.module.css"
import Wrapper from "shared/components/blocks/Wrapper";
import CategoryBreadcrumb from "shared/components/features/CategoryBreadCrump";
import ResultSummary from "./ResultSummary";
import SortSelect from "./SortSelect";

export default function SearchHeader(){
  const [params] = useSearchParams();
  const [searchParams] = parseUrlSearchParams(params);
  const {mainCategory, subCategory, detail} = searchParams;
  
  const categoryPath = subCategory 
    ? `${mainCategory} > ${subCategory}` 
    : mainCategory;
  
  return(
    <header className={styles.header}>
      <Wrapper className="flexBlock">
        <div>
          <CategoryBreadcrumb categoryPath={categoryPath} />
          <ResultSummary detail={detail}/>
        </div>
        <form aria-label="검색 결과 정렬" style={{display:"flex",alignItems:"center"}}>
          <SortSelect/>
        </form>
      </Wrapper>
    </header>
  )
}