import useSearchFilter from "features/Search/hooks/useSearchFilter";
import ShareEnterButton from "./ShareEnterButton";
import { useState } from "react";

export default function ByAuthor() {
  const [searchValue, setSearchValue] = useState("");
  const {setAuthorFilter} = useSearchFilter();
  const handleSearch = () => {
    setAuthorFilter(searchValue);
  }
  return (
    <div className="font-[Galmuri] text-gray-700 text-xl">
      <p>&gt; 작가 이름</p>
      <p>&nbsp;&nbsp;author (검색내용)</p>
      <div className="flex items-center gap-2 text-gray-400 mt-2">
        <input type="text" placeholder="검색내용을 입력하여 자동완성" 
        className="w-1/2 
        placeholder:text-gray-400"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        />
        <ShareEnterButton onClick={handleSearch} />
      </div>
    </div>
  );
}
