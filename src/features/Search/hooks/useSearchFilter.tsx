import { useMemo } from "react";
import { useSearchParams } from "react-router-dom"

const RELATIVE_DTAE_UNIT = {"d" : 1, "w" : 7, "m" : 30, "y" : 365} as const;

export default function useSearchFilter() {
  const [params, setParams] = useSearchParams();
  //필터 상태
  const filter = useMemo(() => {
    return{
      author : params.get("author") ?? undefined,
      dateRange : {
        from : params.get("date_from") ?? undefined,
        to : params.get("date_to") ?? undefined,
      },
      viewRange : {
        min : params.get("view_min") ?? undefined,
        max : params.get("view_max") ?? undefined,
      },
      greatRange : {
        min : params.get("great_min") ?? undefined,
        max : params.get("great_max") ?? undefined,
      }
    }
  }, [params])

  //함수
  const updateParams = (dict : Record<string, string|null>) => {
    const newParams = new URLSearchParams(params);
    for(const [key, value] of Object.entries(dict)){
      if(value === null){
        newParams.delete(key);
      }else{
        newParams.set(key, value);
      }
    }
    setParams(newParams);
  }

  const setAuthorFilter = (author : string|null) => {
    if(author === "") author = null;
    updateParams({"author" : author});
  }

  const setRelativeDateRangeFilter = (dateRange : string|null) => {
    if(!dateRange){
      updateParams({"date_from" : null, "date_to" : null});
    }
    else{
      //문자열 정상 여부 대조, (NNN[UNIT]) 실패시 에러 출력
      const regex = /^(\d+)([dwmyDUMY])/;
      const match = dateRange?.match(regex);
      if(match) {
        //단위를 D로 통일
        const unit = RELATIVE_DTAE_UNIT[match![2].toLowerCase() as keyof typeof RELATIVE_DTAE_UNIT] * parseInt(match![1]);

        //설정
        const from = new Date(new Date().setDate(new Date().getDate() - unit));
        const to = new Date();
        updateParams({"date_from" : `${from.toISOString().split("T")[0]}`, "date_to" : `${to.toISOString().split("T")[0]}`});
      }else{
        throw new Error("종료 일자의 형식이 올바르지 않습니다.");
      }
    }
  }

  const setImplicitDateRangeFilter = (from : string|null, to : string|null) => {
    //from, to는 YYYYMMDD 또는 YYMMDD로 구성됨. 
    let processedFrom: string | null = null;
    let processedTo: string | null = null;

    if(from){
      processedFrom = from;
      if(!(processedFrom.length === 8 || processedFrom.length === 6) || isNaN(parseInt(processedFrom))){
        throw new Error("시작 일자의 형식이 올바르지 않습니다.");
      }
      if(processedFrom.length === 6){
        if(parseInt(processedFrom.slice(0, 2)) < 27){
          processedFrom = "20" + processedFrom;
        }else{
          processedFrom = "19" + processedFrom;
        }
      }
      
      processedFrom = processedFrom.slice(0, 4) + "-" + processedFrom.slice(4, 6) + "-" + processedFrom.slice(6, 8);
    }

    if(to){
      processedTo = to;
      if(!(processedTo.length === 8 || processedTo.length === 6) || isNaN(parseInt(processedTo))){
        throw new Error("종료 일자의 형식이 올바르지 않습니다.");
      }
      if(processedTo.length === 6){
        if(parseInt(processedTo.slice(0, 2)) < 27){
          processedTo = "20" + processedTo;
        }else{
          processedTo = "19" + processedTo;
        }
      }
      processedTo = processedTo.slice(0, 4) + "-" + processedTo.slice(4, 6) + "-" + processedTo.slice(6, 8);
    }

    updateParams({"date_from" : processedFrom ?? null, "date_to" : processedTo ?? null});
  }

  const setViewRangeFilter = (min : string|null, max : string|null) => {
    if(min !== null && min !== "" && isNaN(parseInt(min))){
      throw new Error("조회수 범위의 최소값이 올바르지 않습니다.");
    }
    if(max !== null && max !== "" && isNaN(parseInt(max))){
      throw new Error("조회수 범위의 최대값이 올바르지 않습니다.");
    }
    updateParams({"view_min" : min ?? null, "view_max" : max ?? null});
  }

  const setGreatRangeFilter = (min : string|null, max : string|null) => {
    if(min !== null && min !== "" && isNaN(parseInt(min))){
      throw new Error("좋아요 범위의 최소값이 올바르지 않습니다.");
    }
    if(max !== null && max !== "" && isNaN(parseInt(max))){
      throw new Error("좋아요 범위의 최대값이 올바르지 않습니다.");
    }
    if(min === null || min === ""){
      updateParams({"great_min" : min ?? null, "great_max" : max ?? null});
    }
  }

  const resetFilter = () => {
    updateParams({"author" : null, "date_from" : null, "date_to" : null, "view_min" : null, "view_max" : null, "great_min" : null, "great_max" : null});
  }

  return {filter, setAuthorFilter, setRelativeDateRangeFilter, setImplicitDateRangeFilter, setViewRangeFilter, setGreatRangeFilter, resetFilter} as const
  
}