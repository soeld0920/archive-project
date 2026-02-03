import { Link, useSearchParams } from "react-router-dom"
import type { WritingIndex } from "shared/types/entity/Writing"
import defaultUserImage from "assets/img/profile-fallback.png"
import { parseUrlSearchParams } from "../libs/parseUrlSearchParams"
import { useWritingSearchResult } from "../hooks/query/useWritingSearchResult"
import { FaComment, FaHeart } from "react-icons/fa6"
import { parseNormalizerDate } from "shared/lib/utils/parseNormalizerDate"


export default function SearchResultsList() {
  const [params] = useSearchParams();
  const urlParams = parseUrlSearchParams(params);
  const {searchParams, page, sortBy} = urlParams;
  const {items} = useWritingSearchResult(searchParams, page, sortBy);
  const {data : writings, isLoading, isError, error} = items;

  if(isError){
    console.error(error);
  }

  if(isLoading){
    return <div className="text-2xl font-[Galmuri] text-gray-700">Loading...</div>;
  }

  return(
    <ol className="grid grid-cols-2 gap-x-30 gap-y-20" aria-label="검색 결과 목록" start={(page - 1) * 10 + 1}>
      {
        writings?.map((r : WritingIndex) => (
          <SearchResultItem key={r.writingUuid} item={r}/>
        ))
      }
    </ol>
  )
}

function SearchResultItem({item} : {item : WritingIndex}){
  return(
    <li>
      <article className="w-auto h-auto">
        <header className="flex gap-2">
          <img className="w-6 h-6 rounded-full" src={item.authorImage ?? defaultUserImage} alt="." />
          <Link to={`/blog/${item.authorUuid}`}><span className="text-sm font-[Galmuri] text-gray-700 hover:underline">{item.authorName}</span></Link>
        </header>
        <main className="flex gap-5 mt-3">
          <div className="flex-1">
            <p className="text-sm text-gray-500">{item.mainCategoryName} &gt; {item.subCategoryName}</p>
            <Link to={`/writing/${item.writingUuid}`}><h2 className="text-3xl text-gray-700 font-bold hover:underline">{item.writingTitle}</h2></Link>
            <p className="text-md text-gray-500 mt-1 line-clamp-2 h-14">{item.content}</p>
          </div>
          {item.image && <img className="w-1/2 h-auto" src={item.image} alt="." />}
        </main>
        <footer className="flex gap-3 mt-3">
          <p className="flex items-center gap-1"><FaHeart/> <span className="text-gray-500">{item.great}</span></p>
          <p className="flex items-center gap-1"><FaComment/> <span className="text-gray-500">{item.commentCount}</span></p>
          <span className="text-gray-500">{parseNormalizerDate(item.createAt)}</span>
        </footer>
      </article>
    </li>
  )
}