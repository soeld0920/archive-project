import { useState } from "react";
import ShareEnterButton from "./ShareEnterButton";
import Dropdown from "shared/components/blocks/InputComponets/Dropdown";
import useSearchFilter from "features/Search/hooks/useSearchFilter";
import { useMessageContext } from "app/providers/message";

export default function DelFilter() {
  const [delFilterData, setDelFilterData] = useState<string | undefined>(undefined);
  const {resetFilter, setAuthorFilter, setRelativeDateRangeFilter, setViewRangeFilter, setGreatRangeFilter} = useSearchFilter();
  const [messageApi] = useMessageContext();

  const handleFilter = () => {
    if(delFilterData == undefined){
      messageApi.open({type : "error", content : "필드를 선택해주세요.", duration : 2});
      return;
    }
    switch(delFilterData){
      case "author":
        setAuthorFilter(null);
        break;
      case "date":
        setRelativeDateRangeFilter(null);
        break;
      case "view":
        setViewRangeFilter(null, null);
        break;
      case "like":
        setGreatRangeFilter(null, null);
        break;
      case "all":
        resetFilter();
        break;
    }
  }

  return (
    <div className="font-[Galmuri] text-gray-700 text-xl">
      <p>&gt; 필터 제거</p>
      <p>&nbsp;&nbsp;del (필터명)</p>
      <div className="flex items-center gap-2 text-gray-400 mt-2">
        <Dropdown options={["author", "until", "during", "view", "like", "all"]} 
        value={delFilterData} onChange={setDelFilterData} label={`${delFilterData ? delFilterData : "제거할 필터"}`} 
        toString={(value) => value as string}
        arrow={false} textColor="var(--color-gray-400)"
        />
        <p>로 자동완성</p>
        <ShareEnterButton onClick={handleFilter} />
      </div>
    </div>
  );
}
