import { useMemo, useState } from "react";
import useSearchFilter from "../../hooks/useSearchFilter";
import { useMessageContext } from "app/providers/message";
import useIsFilterAssistOpenStore from "features/Search/store/isFilterAssistOpen";

export default function SetFilterByText(){
  const {setAuthorFilter, setRelativeDateRangeFilter, setImplicitDateRangeFilter, setViewRangeFilter, setGreatRangeFilter, resetFilter} = useSearchFilter();
  const [text, setText] = useState("");
  const [messageApi] = useMessageContext();
  const commendMap = useMemo(() => ({
    "author" : setAuthorFilter,
    "until" : setRelativeDateRangeFilter,
    "during" : setImplicitDateRangeFilter,
    "view" : setViewRangeFilter,
    "like" : setGreatRangeFilter,
    "del" : (target : string | null) => {
      switch(target){
        case "author":
          setAuthorFilter(null);
          break;
        case "until":
          setRelativeDateRangeFilter(null);
          break;
        case "during":
          setImplicitDateRangeFilter(null, null);
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
        default:
          throw new Error(`존재하지 않는 명령어입니다: ${target}`);
      }
    }
  }), []);

  const {setIsFilterAssistOpen} = useIsFilterAssistOpenStore();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter"){
      const command = text.trim();
      const [commend, ...args] = command.split(" ");
      const handler = commendMap[commend as keyof typeof commendMap];
      console.log(commend, args);
      if(handler){
        try {
          handler(...(args as [string | null, string | null]));
        } 
        catch (error) {
          messageApi.open({type : "error", content : `필터 설정 오류: ${error instanceof Error ? error.message : "알 수 없는 오류"}`, duration : 3});
        }
      }else{
        messageApi.open({type : "error", content : `필터 설정 오류: 존재하지 않는 명령어입니다.`, duration : 3});
      }
      setText("");
    }
  }

  return (
    <input type="text" placeholder="추가 필터 조건이 필요하면 입력하시오..." 
    className="w-1/3 h-auto border-none outline-none"
    value={text} onKeyDown={handleKeyDown} onChange={(e) => setText(e.target.value)}
    onFocus={() => setIsFilterAssistOpen(true)}
    />
  );
}