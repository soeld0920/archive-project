import { useWritingsContent, WritingsProvider } from "./context/writingsContent"
import styles from "./Search.module.css"
import { useSearchParams } from "react-router-dom"
import { useEffect } from "react"
import { PageProvider } from "./context/pageContent"
import UserProfileCard from "shared/components/features/UserProfileInfo"
import Wrapper from "shared/components/blocks/Wrapper"
import { FilterProvider, useFilterContent } from "./context/FilterContent"
import { SortProvider, useSortContent } from "./context/sortContent"
import { FilterPanel } from "./Components/FilterPanel"
import SearchHeader from "./Components/SearchHeader"
import NoResults from "./Components/NoResults"
import SearchResultsList from "./Components/SearchResultsList"
import SelectPagination from "./Components/SelectPagination"
import { api } from "axios/api"
import usePageAtSearch from "./hooks/usePage"

export default function Search(){
  return(
    <FilterProvider>
      <SortProvider>
        <WritingsProvider>
          <PageProvider>
            <SearchContent/>
          </PageProvider>
        </WritingsProvider>
      </SortProvider>
    </FilterProvider>
  )
}

export function SearchContent(){
  const [writings,setWritings] = useWritingsContent();
  const {filterState} = useFilterContent();
  const [params] = useSearchParams();
  const {page, setPageCount} = usePageAtSearch();
  const [sortStandard] = useSortContent();

  useEffect(() => {
    const fetchWritings = async () => {
      console.log(1);
      const reqBody =  {
        mainCategoryId : params.get("mainCategory"),
        subCategoryId : params.get("subCategory"),
        title : params.get("detail"),
        author : filterState.author,
        formType : filterState.formType,
        dateRange : filterState.dateRange,
        viewRange : filterState.viewRange,
        greatRange : filterState.greatRange,
        page : page,
        sortBy : sortStandard
      };

      const res1 = await api.post("/search/length", reqBody);
      const res2 = await api.post("/search", reqBody);
      console.log(res2.data);
      setWritings(res2.data);
      setPageCount(res1.data as number);
    }
    fetchWritings();
  }, [params, page, filterState, sortStandard]);

  return(
    <main>
      <section>
        <SearchHeader/>
        <Wrapper className={styles.bodyWrapper}>
          <aside style={{width : "370px", height : "100%"}}>
            <UserProfileCard/>
            <FilterPanel/>
          </aside>
          {writings.length === 0 ? <NoResults /> : <SearchResultsList/>}
        </Wrapper>
        {writings.length !== 0 && <SelectPagination/>}
      </section>
    </main>
  )
}