import Dropdown from "shared/components/blocks/InputComponets/Dropdown";
import ShareEnterButton from "./ShareEnterButton";
import { useState } from "react";
import useSearchFilter from "features/Search/hooks/useSearchFilter";
import { useMessageContext } from "app/providers/message";

export default function ByDate() {
  const [untilDateData, setUntilDateData] = useState<string>("");
  const [duringFromDateData, setDuringFromDateData] = useState<string>("");
  const [duringToDateData, setDuringToDateData] = useState<string>("");
  const {setRelativeDateRangeFilter, setImplicitDateRangeFilter} = useSearchFilter();
  const [messageApi] = useMessageContext();
  
  const handleRelativeDateRange = () => {
    try{
      setRelativeDateRangeFilter(untilDateData);
    }catch(error){
      messageApi.open({type : "error", content : "날짜 형식은 YYYYMMDD 또는 YYMMDD 형식으로 입력해주세요.", duration : 2});
    }
  }
  const handleImplicitDateRange = () => {
    try{
      setImplicitDateRangeFilter(duringFromDateData, duringToDateData);
    }catch(error){
      messageApi.open({type : "error", content : "날짜 형식은 YYYYMMDD 또는 YYMMDD 형식으로 입력해주세요.", duration : 2});
    }
  }
  return (
    <div className="font-[Galmuri] text-gray-700 text-xl">
      <p>&gt; 작성일</p>
      <p className="mt-2">-오늘을 기준으로 찾고 싶으면 until (기간)</p>
      <div className="flex items-center gap-2 text-gray-400">
        <Dropdown options={["1d", "3d", "7d", "1m", "3m", "6m", "1y", "3y"]} 
        value={untilDateData} onChange={setUntilDateData} 
        label={`${untilDateData ? untilDateData : "기간"}`} 
        toString={(value) => value as string}
        arrow={false} textColor="var(--color-gray-400)"
        />
        <p>으로 자동완성</p>
        <ShareEnterButton onClick={handleRelativeDateRange} />
      </div>
      <p className="mt-3">-특정 기간 새로 찾고 싶으면 during (시작일) (종료일)</p>
      <div className="flex items-center gap-2 text-gray-400 mt-2">
        <input type="text" placeholder="시작일" className="w-1/7 placeholder:text-gray-400"
        value={duringFromDateData}
        onChange={(e) => setDuringFromDateData(e.target.value)}
        />
        <span>~</span>
        <input type="text" placeholder="종료일" className="w-1/7 placeholder:text-gray-400"
        value={duringToDateData}
        onChange={(e) => setDuringToDateData(e.target.value)}
        />
        <p> 입력하여 자동완성</p>
        <ShareEnterButton onClick={handleImplicitDateRange} />
      </div>
    </div>
  );
}
