import PageHeader from "shared/components/features/PageHeader"
import { MdSearch } from "react-icons/md"
import SearchHeader from "./Components/SearchHeader"
import Wrapper from "shared/components/blocks/Wrapper"
import SearchResultsList from "./Components/SearchResultsList"
import SelectSortBy from "./Components/SelectSortBy"
import SelectPagination from "./Components/SelectPagination"
import SearchFilterAssist from "./Components/SearchFilterAssist"

export default function Search(){
  return(
    <main className="z-10 relative">
      <section>
        <PageHeader icon={<MdSearch />} title="Search" />
        <div className="relative h-auto">
          <SearchHeader/>
          <SearchFilterAssist/>
        </div>
        <Wrapper className="mt-5">
          <SelectSortBy/>
          <SearchResultsList/>
          <SelectPagination/>
        </Wrapper>
      </section>
    </main>
  )
}