import ShareEnterButton from "./ShareEnterButton";
import { useState } from "react";
import useSearchFilter from "features/Search/hooks/useSearchFilter";

export default function ByView() {
  const [minViewData, setMinViewData] = useState<string>("");
  const [maxViewData, setMaxViewData] = useState<string>("");
  const {setViewRangeFilter} = useSearchFilter();
  const handleViewRange = () => {
    setViewRangeFilter(minViewData, maxViewData);
  }
  return (
    <div className="font-[Galmuri] text-gray-700 text-xl">
      <p>&gt; 조회수</p>
      <p>&nbsp;&nbsp;view (최소치) (최대치)</p>
      <div className="flex items-center gap-2 text-gray-400 mt-2">
        <input type="text" placeholder="최소치" className="w-1/7 placeholder:text-gray-400"
        value={minViewData}
        onChange={(e) => setMinViewData(e.target.value)}
        />
        <span>~</span>
        <input type="text" placeholder="최대치" className="w-1/7 placeholder:text-gray-400"
        value={maxViewData}
        onChange={(e) => setMaxViewData(e.target.value)}
        />
        <p>로 자동완성</p>
        <ShareEnterButton onClick={handleViewRange} />
      </div>
    </div>
  );
}
