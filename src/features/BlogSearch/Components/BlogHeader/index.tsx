import { useParams } from "react-router-dom";
import styles from "features/Search/Search.module.css"
import Wrapper from "shared/components/blocks/Wrapper";
import CategoryBreadcrumb from "shared/components/features/CategoryBreadCrump";
import BlogSortSelect from "./BlogSortSelect";
import BlogResultSummary from "./BlogResultSummary";

export default function BlogHeader(){
  const {uuid} = useParams<{uuid: string}>();
  
  return(
    <header className={styles.header} style={{height:"auto"}}>
      <Wrapper className="flexBlock">
        <div>
          <CategoryBreadcrumb categoryPath="블로그" />
          <BlogResultSummary userUuid={uuid || ""}/>
        </div>
        <form aria-label="블로그 글 정렬" style={{display:"flex",alignItems:"center"}}>
          <BlogSortSelect/>
        </form>
      </Wrapper>
    </header>
  )
}
