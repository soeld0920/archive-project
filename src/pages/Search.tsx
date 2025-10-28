import getSearchResult from "backend/SearchResult";
import useSearchFilter from "features/Search/hooks/useSearchFilter";
import useSearchSort from "features/Search/hooks/useSearchSort";
import { parseUrlSearchParams } from "features/Search/lib/parseUrlSearchParams";
import { applySearchFilters, filterResultsByCategory } from "features/Search/lib/searchFilters";
import { applySearchSort } from "features/Search/lib/searchSort";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import UserProfileCard from "components/UserProfileInfo";
import SearchHeader from "features/Search/Components/SearchHeader";
import SearchFilterPanel from "features/Search/Components/SearchFilterPanel";
import NoResults from "features/Search/Components/NoResults";
import SearchResultsList from "features/Search/Components/SearchResultsList";
import SelectPagination from "features/Search/Components/SelectPagination";

export default function Search(){
  const [params] = useSearchParams();

  const [searchParams, userId] = parseUrlSearchParams(params);
  const [filterState, filterDispatch] = useSearchFilter();
  const [sortStandard, setSortStandard] = useSearchSort();
  const [page, setPage] = useState(1);

  const filterKey = JSON.stringify({
    byAuthor: filterState.byAuthor,
    author: filterState.author,
    formType: filterState.formType,
    during: filterState.during,
    dateRange: filterState.dateRange,
    viewEnabled: filterState.viewEnabled,
    viewRange: filterState.viewRange,
    greatEnabled: filterState.greatEnabled,
    greatRange: filterState.greatRange,
  });

  const queryKey = JSON.stringify({
    main: searchParams.mainCategory,
    sub: searchParams.subCategory,
    detail: searchParams.detail,
  });

  const sortKey = JSON.stringify(sortStandard);

  const results = useMemo(() => {
    const base = getSearchResult(searchParams);
    const byCat = filterResultsByCategory(base, searchParams.mainCategory, searchParams.subCategory);
    const byState = applySearchFilters(byCat, filterState);
    const sorted = applySearchSort(byState, sortStandard);
    return sorted;
  },[filterKey,queryKey,sortKey])

  const deferredResults = useDeferredValue(results);
  
  useEffect(() => setPage(1), [filterKey, sortKey, queryKey])

  return(
    <main>
      <section>
        <SearchHeader variant={results.length === 0 ? "error" : "default"} query={searchParams} results={results} page={page} sortStandard={sortStandard} setSortStandard={setSortStandard}/>
        <div style={{width : "calc(100% - 40px)", margin : "20px 20px 0", display : "flex", justifyContent : "space-between"}}>
          <aside style={{width : "370px", height : "100%"}}>
            <UserProfileCard userUUID={userId}/>
            <SearchFilterPanel filterState={filterState} filterDispatch={filterDispatch}/>
          </aside>
          {results.length === 0 ? <NoResults /> : <SearchResultsList results = {deferredResults} page={page}/>}
        </div>
        {results.length !== 0 && <SelectPagination page={page} setPage={setPage} total={results.length}/>}
      </section>
    </main>
  )
}