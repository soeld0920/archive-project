import { useWritingsContent, WritingsProvider } from "./context/writingsContent"
import { useSearchParams } from "react-router-dom"
import { useEffect } from "react"
import { PageProvider } from "./context/pageContent"
import { FilterProvider, useFilterContent } from "./context/FilterContent"
import { SortProvider, useSortContent } from "./context/sortContent"
import { api } from "axios/api"
import { usePageContent } from "./context/pageContent"
import PageHeader from "shared/components/features/PageHeader"
import { MdSearch } from "react-icons/md"
import { SearchStateProvider, useSearchStateContent } from "./context/searchStateContext"
import SearchHeader from "./Components/SearchHeader"

export default function Search(){
  return(
    <FilterProvider>
      <SortProvider>
        <WritingsProvider>
          <PageProvider>
            <SearchStateProvider>
              <SearchContent/>
            </SearchStateProvider>
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
  const {page, setPageCount} = usePageContent();
  const [sortStandard] = useSortContent();
  const [_, setSearchState] = useSearchStateContent();

  useEffect(() => {
    const fetchWritings = async () => {
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
      setWritings(res2.data);
      setPageCount(res1.data as number);
      if(res1.data === 0) setSearchState("noResults");
      else setSearchState("results");
    }
    fetchWritings();
  }, [params, page, filterState, sortStandard]);

  return(
    <main>
      <section>
        <PageHeader icon={<MdSearch />} title="Search" />
        <SearchHeader/>
        {/* <Wrapper className={styles.bodyWrapper}>
          <aside style={{width : "370px", height : "100%"}}>
            <UserProfileCard/>
            <FilterPanel/>
          </aside>
          {writings.length === 0 ? <NoResults /> : <SearchResultsList/>}
        </Wrapper>
        {writings.length !== 0 && <SelectPagination/>} */}
      </section>
    </main>
  )
}