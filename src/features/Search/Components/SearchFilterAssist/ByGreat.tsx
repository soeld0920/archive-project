
import { useState } from "react";
import ShareEnterButton from "./ShareEnterButton";
import useSearchFilter from "features/Search/hooks/useSearchFilter";

export default function ByGreat() {
  const [minGreatData, setMinGreatData] = useState<string>("");
  const [maxGreatData, setMaxGreatData] = useState<string>("");
  const {setGreatRangeFilter} = useSearchFilter();
  const handleGreatRange = () => {
    setGreatRangeFilter(minGreatData, maxGreatData);
  }
  return (
    <div className="font-[Galmuri] text-gray-700 text-xl">
      <p>&gt; 좋아요</p> 
      <p>&nbsp;&nbsp;like (최소치) (최대치)</p>
      <div className="flex items-center gap-2 text-gray-400 mt-2">
        <input type="text" placeholder="최소치" className="w-1/7 placeholder:text-gray-400"
        value={minGreatData}
        onChange={(e) => setMinGreatData(e.target.value)}
        />
        <span>~</span>
        <input type="text" placeholder="최대치" className="w-1/7 placeholder:text-gray-400"
        value={maxGreatData}
        onChange={(e) => setMaxGreatData(e.target.value)}
        />
        <p>로 자동완성</p>
        <ShareEnterButton onClick={handleGreatRange} />
      </div>
    </div>
  );
}
