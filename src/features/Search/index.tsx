import { useWritingsContent, WritingsProvider } from "./context/writingsContent"
import styles from "./Search.module.css"
import { useSearchParams } from "react-router-dom"
import { fetchWritings } from "./libs/fetchSearchParams"
import { useEffect } from "react"
import { PageProvider } from "./context/pageContent"
import UserProfileCard from "shared/components/features/UserProfileInfo"
import Wrapper from "shared/components/blocks/Wrapper"
import { FilterProvider } from "./context/FilterContent"
import { SortProvider } from "./context/sortContent"
import { FilterPanel } from "./Components/FilterPanel"
import SearchHeader from "./Components/SearchHeader"
import NoResults from "./Components/NoResults"
import SearchResultsList from "./Components/SearchResultsList"
import SelectPagination from "./Components/SelectPagination"

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
  const [params] = useSearchParams();

  useEffect(() => {
    fetchWritings(params).then(data => {
      setWritings(data);
    });
  }, [params]);

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