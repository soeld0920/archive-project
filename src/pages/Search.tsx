import ErrorSpan from "components/shared/ErrorSpan";
import {HighlightSpan} from "components/shared/HighlightSpan";
import {SubP, SubSpan} from "components/shared/SubSpan";
import { createSearchParams, Link, useSearchParams } from "react-router-dom";
import styles from "styles/modules/Search.module.css"
import type { SearchParams } from "content/category";
import UserInfo from "components/UserInfo";
import Fuse, { type FuseResult, type IFuseOptions } from "fuse.js";
import { writingList, type writingType } from "content/writing";
import { useEffect, useMemo, useReducer, useState } from "react";
import { compareAsc, compareDesc, isWithinInterval, parseISO, startOfToday, subDays, subMonths, subYears } from "date-fns";
import millify from "millify";
import { Pagination, Slider } from "antd";


const sortContents = ["정확도순", "최신순", "오래된순","조회수 높은 순", "조회수 낮은 순", "좋아요 많은 순", "좋아요 적은 순", "가나다순"];
const viewRangeData = [100,500,1000,5000,10000,50000,100000,500000,1000000]
const greatRangeData = [1,10,50,100,200,400,750,1000,1500,2000,3000,5000,10000,25000]

type FormType = "all" | "snippet" | "series";
type During = "7d" | "1m" | "6m" | "1y" | "3y" | "custom" | "all";
type Sort = "정확도순"| "최신순"| "오래된순"|"조회수 높은 순"| "조회수 낮은 순"| "좋아요 많은 순"| "좋아요 적은 순"| "가나다순";

type FilterState = {
  byAuthor: boolean;
  author: string;
  formType: FormType;
  during: During;
  from?: string;    // YYYY-MM-DD
  to?: string;
  viewEnabled: boolean;
  viewMin?: number;
  viewMax?: number;
  greatEnabled: boolean;
  greatMin?: number;
  greatMax?: number;
};


type Action =
| { type: "TOGGLE_BY_AUTHOR"; payload: boolean }
| { type: "SET_AUTHOR"; payload: string }
| { type: "SET_FORM_TYPE"; payload: FormType }
| { type: "SET_DURING"; payload: During }
| { type: "SET_DATE_RANGE"; payload: { from?: string; to?: string } }
| { type: "SET_VIEW_ENABLED"; payload: boolean }
| { type: "SET_VIEW_RANGE"; payload: { min?: number; max?: number } }
| { type: "SET_GREAT_ENABLED"; payload: boolean }
| { type: "SET_GREAT_RANGE"; payload: { min?: number; max?: number } }
| { type: "RESET" }
| { type: "HYDRATE"; payload: Partial<FilterState> };

export default function Search(){
  const [params] = useSearchParams()
  const searchParams : SearchParams = 
  {
    mainCategory : params.get("mainCategory") || "",
    subCategory : params.get("subCategory") || "",
    detail : params.get("detail") || ""
  };
  const userUUID = params.get("UUID") || "";
  const [pageNum, setPageNum] = useState(1);

  const initialState : FilterState = {
    byAuthor : false,
    author : "",
    formType : "all",
    during : "all",
    viewEnabled : false,
    greatEnabled : false
  }

  function reducer(state: FilterState, action: Action): FilterState {
    switch (action.type) {
      case "TOGGLE_BY_AUTHOR": return { ...state, byAuthor: action.payload, author: action.payload ? state.author : "" };
      case "SET_AUTHOR": return { ...state, author: action.payload };
      case "SET_FORM_TYPE": return { ...state, formType: action.payload };
      case "SET_DURING":
        return action.payload === "custom"
          ? { ...state, during: "custom" }
          : { ...state, during: action.payload, from: undefined, to: undefined };
      case "SET_DATE_RANGE": return { ...state, during: "custom", ...action.payload };
      case "SET_VIEW_ENABLED": return { ...state, viewEnabled: action.payload, ...(action.payload ? {} : { viewMin: undefined, viewMax: undefined }) };
      case "SET_VIEW_RANGE": return { ...state, viewMin: action.payload.min, viewMax: action.payload.max };
      case "SET_GREAT_ENABLED": return { ...state, greatEnabled: action.payload, ...(action.payload ? {} : { greatMin: undefined, greatMax: undefined }) };
      case "SET_GREAT_RANGE": return { ...state, greatMin: action.payload.min, greatMax: action.payload.max };
      case "HYDRATE": return { ...state, ...action.payload };
      case "RESET": return initialState;
      default: return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const [sort, setSort] = useState<Sort>("정확도순");

  const result = useMemo(() =>{const fuseOption :IFuseOptions<writingType> = {
      keys: [
        { name: "title",  weight: 0.6 },
        { name: "tag",    weight: 0.25 },
        { name: "author", weight: 0.15 },
      ],
      threshold: 0.35,        // 기본 0.6보다 엄격(오탈자 조금 허용)
      ignoreLocation: true,   // 한글/단어 길이에 유리
      minMatchCharLength: 2,  // 1글자 검색은 패스
      includeScore: true,     // 정렬/디버깅에 도움
      useExtendedSearch: true // ^접두, ="정확" 같은 고급 검색 허용
    };

    const filteredList = writingList.filter(write => {
      if(searchParams.mainCategory !== "" && write.mainCategory !== searchParams.mainCategory) return false;
      if(searchParams.subCategory !== "" && write.subCategory !== searchParams.subCategory) return false;

      const {byAuthor,author,formType,during,from, to,viewEnabled,viewMin,viewMax,greatEnabled,greatMin,greatMax} = state;
      if(formType !== "all" && write.formType !== formType) return false;

      if (during !== "all") {
        const d = parseISO(write.date);
        const today = startOfToday();

        if (during === "custom") {
          const start = from ? parseISO(from) : new Date(0); // 최소값
          const end   = to   ? parseISO(to)   : today;       // 오늘까지
          if (!isWithinInterval(d, { start, end })) return false;
        } else {
          let start = today;
          switch (during) {
            case "7d": start = subDays(today, 7); break;
            case "1m": start = subMonths(today, 1); break;
            case "6m": start = subMonths(today, 6); break;
            case "1y": start = subYears(today, 1); break;
            case "3y": start = subYears(today, 3); break;
          }
          // start 이후(포함)만 통과
          if (d < start) return false;
        }
      }

      if (viewEnabled) {
        if (viewMin != null && write.view < viewMin) return false;
        if (viewMax != null && write.view > viewMax) return false;
      }
      if (greatEnabled) {
        if (greatMin != null && write.great < greatMin) return false;
        if (greatMax != null && write.great > greatMax) return false;
      }


      if(byAuthor){
        const q = (author ?? "").trim().toLowerCase();
        if (!q) return false;
        const name = (write.author ?? "").toLowerCase();
        // 한글 정규화(자모/조합 섞임 방지)
        if (!name.normalize("NFC").includes(q.normalize("NFC"))) return false;
      }

      return true;
    })

    const index = Fuse.createIndex(fuseOption.keys || [], filteredList);
    const fuse = new Fuse(filteredList, fuseOption, index);
    const q = searchParams.detail.trim().normalize("NFC");
    let results;
    if (q.length < 2) {results = filteredList.map(item => ({ item, score: 1 })) as FuseResult<writingType>[]}
    else results = fuse.search(q) as FuseResult<writingType>[];
    switch(sort){
      case "정확도순" : results = results.sort((a,b) => (a.score || 0) - (b.score || 0)); break;
      case "최신순" : results = results.sort((a,b) => compareDesc(parseISO(a.item.date),parseISO(b.item.date))); break;
      case "오래된순" : results = results.sort((a,b) => compareAsc(parseISO(a.item.date),parseISO(b.item.date))); break;
      case "조회수 높은 순" : results = results.sort((a,b) => b.item.view - a.item.view); break;
      case "조회수 낮은 순" : results = results.sort((a,b) => a.item.view - b.item.view); break;
      case "좋아요 많은 순" : results = results.sort((a,b) => b.item.great - a.item.great); break;
      case "좋아요 적은 순" : results = results.sort((a,b) => a.item.great - b.item.great); break;
      case "가나다순" : results = results.sort((a, b) => a.item.title.localeCompare(b.item.title, 'ko-KR', { sensitivity: 'base' }));
    }

    return results;
  }, [writingList, state, sort, searchParams.mainCategory, searchParams.subCategory, searchParams.detail])

  useEffect(() => setPageNum(1), [state, sort, searchParams])
  
  return(
    <div>
      <SearchHead type={result.length === 0 ? "error" : "default"} searchParams={searchParams} result={result} pageNum={pageNum} sort={sort} setSort={setSort}/>
      <div>
        <div style={{width : "calc(100% - 40px)", margin : "20px 20px 0", display : "flex", justifyContent : "space-between"}}>
          <div style={{width : "370px", height : "100%"}}>
            <UserInfo userUUID={userUUID}/>
            <FilterWrapper state={state} dispatch={dispatch}/>
          </div>
          {
          result.length === 0 ? <NoFind /> : <Finded result = {result} pageNum={pageNum}/>
          }
        </div>
      </div>
      {result.length !== 0 && <PageSelect pageNum={pageNum} setPageNum={setPageNum} total={result.length}/>}
    </div>
  )
}


function NoFind(){
  return(
    <div className={styles.rightWrapper}>
      <h3>결과를 찾을 수 없습니다.</h3>
    </div>
  )
}

type FindedProps = {
  result : FuseResult<writingType>[],
  pageNum:number,
}
function Finded({result,pageNum} : FindedProps) {
  return(
    <ul className={styles.rightWrapper}>
      {
        result.slice((pageNum-1) * 10, (pageNum) * 10).map(r => (
          <li key={r.item.UUID} className={styles.resultItem}>
          {
          r.item.image &&
          <div style={{width : "180px",height : "180px", border : "1px solid var(--border-color)"}}>
            <img src={r.item.image} alt="글의 이미지"/>
          </div>
          }
            <div style={{width : `calc(100% - ${r.item.image ? "200px" : "0px"})`,height : "180px"}}>
              <SubP>{r.item.mainCategory  + ">" + r.item.subCategory}</SubP>
              <h3 style={{margin : 0, marginBottom : "10px"}}>
                <Link to={`/page/${createSearchParams({UUID : r.item.UUID})}`}>{r.item.title}</Link>
              </h3>
              <p><Link to={`/user/${r.item.author}`}>{r.item.author}</Link> | {r.item.date} | {r.item.formType === "snippet" ? "단편" : <Link to={`/sereis/${r.item.seriesUUID}`}>{r.item.seriesTitle}</Link>}</p>
              <p style={{marginBottom : "10px"}}>조회수 {millify(r.item.view, { precision: 1 })} | 좋아요 : {millify(r.item.great, { precision: 1 })} | 댓글 : {r.item.comment.length}</p>
              <SubP className={styles.clamp2}>{r.item.content}</SubP>
            </div>
          </li>
        ))
      }
    </ul>
  )
}

type SearchHeadProps = {
  type : "error" | "default",
  searchParams : SearchParams,
  result : FuseResult<writingType>[];
  pageNum : number;
  sort : string;
  setSort : (s : Sort) => void;
}

function SearchHead({type, searchParams,result,pageNum,sort,setSort} : SearchHeadProps){
  const {mainCategory, subCategory, detail} = searchParams;
  return(
    <div className={styles.header}>
      <div>
        <SubSpan>
          {
            mainCategory === ""
            ? "전체보기"
            : `${mainCategory}${subCategory ? ` > ${subCategory}` : ""}`
          }
        </SubSpan>
        {
          type === "error" ? 
          <p><ErrorSpan>{detail}</ErrorSpan>에 대한 결과를 찾을 수 없습니다.</p>
          :
          <div style={{display : "flex"}}>
            <p><HighlightSpan>{detail}</HighlightSpan>에 대한 결과입니다.</p>
            <SubP>총 <HighlightSpan>{result.length}</HighlightSpan>개의 결과를 찾았습니다. 페이지 <HighlightSpan>{pageNum}</HighlightSpan> / {Math.ceil(result.length / 10)}</SubP>
          </div>
        }
      </div>
      <div style={{display : "flex", gap : "var(--gap-little)", alignItems:"center"}}>
        <select className={styles.sortWrapper} onChange={(e) => setSort(e.target.value as Sort)} value={sort}>
          {
            sortContents.map((s) => (
              <option value={s} key={s}>{s}</option>
            ))
          }
        </select>
      </div>
    </div>
  )
}

type FilterWrapperProps = {
  state : FilterState;
  dispatch : React.Dispatch<Action>
}

function FilterWrapper({state, dispatch} : FilterWrapperProps){
  const [authorInput, setAuthorInput] = useState(state.author);
  const [duringRange, setDuringRange] = useState<{from : undefined | string, to : undefined | string}>({from : undefined, to : undefined});
  const [viewRange, setViewRange] = useState<{min : undefined | number, max : undefined | number}>({min : 0, max : viewRangeData.length});
  const [greatRange, setGreatRange] = useState<{min : undefined | number, max : undefined | number}>({min : 0, max : greatRangeData.length});

  const onAuthorSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthorInput(e.currentTarget.value);
    dispatch({type : "SET_AUTHOR", payload : e.currentTarget.value})
  }

  const onReset = () => {
    dispatch({type : "RESET"});
  }

  const onFormTypeSubmit = (e : React.ChangeEvent<HTMLInputElement>) => {
    dispatch({type : "SET_FORM_TYPE", payload : e.currentTarget.value as FormType})
  }

  const onDuringSubmit = (e : React.ChangeEvent<HTMLInputElement>) => {
    dispatch({type : "SET_DURING", payload : e.currentTarget.value as During})
  }

  const onDuringRangeSubmit = (e: React.ChangeEvent<HTMLInputElement>, key : keyof typeof duringRange) => {
    const next = {...duringRange, [key] : e.currentTarget.value};
    setDuringRange(next)
    dispatch({type : "SET_DATE_RANGE", payload : next})
  }
  return(
    <ul className={styles.filterWrapper}>
      <li>
        <label className={styles.filterOption}><input type="checkbox" onChange={e =>{setAuthorInput("");dispatch({type : "TOGGLE_BY_AUTHOR", payload : e.currentTarget.checked});}} checked={state.byAuthor}/><p>작성자명으로 검색</p></label>
        <input value={authorInput} onChange={e => {onAuthorSubmit(e);}} type="text"  disabled={!state.byAuthor}/>
      </li>
      <li>
        <label className={styles.filterOption}><input type="radio" name="formType" value={"all"} onChange={e => onFormTypeSubmit(e)} checked={state.formType === "all"}/><p>전체</p></label>
        <label className={styles.filterOption}><input type="radio" name="formType" value={"snippet"} onChange={e => onFormTypeSubmit(e)} checked={state.formType === "snippet"}/><p>단편</p></label>
        <label className={styles.filterOption}><input type="radio" name="formType" value={"series"} onChange={e => onFormTypeSubmit(e)} checked={state.formType === "series"}/><p>시리즈</p></label>
      </li>
      <li>
        <label className={styles.filterOption}><input type="radio" name="during" value={"all"} onChange={e => onDuringSubmit(e)} checked={state.during === "all"}/><p>모두보기</p></label>
        <label className={styles.filterOption}><input type="radio" name="during" value={"7d"} onChange={e => onDuringSubmit(e)} checked={state.during === "7d"}/><p>최근 7일 이내</p></label>
        <label className={styles.filterOption}><input type="radio" name="during" value={"1m"} onChange={e => onDuringSubmit(e)} checked={state.during === "1m"}/><p>최근 1달 이내</p></label>
        <label className={styles.filterOption}><input type="radio" name="during" value={"6m"} onChange={e => onDuringSubmit(e)} checked={state.during === "6m"}/><p>최근 6달 이내</p></label>
        <label className={styles.filterOption}><input type="radio" name="during" value={"1y"} onChange={e => onDuringSubmit(e)} checked={state.during === "1y"}/><p>최근 1년 이내</p></label>
        <label className={styles.filterOption}><input type="radio" name="during" value={"3y"} onChange={e => onDuringSubmit(e)} checked={state.during === "3y"}/><p>최근 3년 이내</p></label>
        <label className={styles.filterOption}><input type="radio" name="during" value={"custom"} onChange={e => onDuringSubmit(e)} checked={state.during === "custom"}/><p>직접 설정</p></label>
        <input type="date" value={duringRange.from} onChange={e => onDuringRangeSubmit(e,"from")} disabled={state.during !== "custom"}/> <span>~</span> <input type="date"  value={duringRange.to} onChange={e => onDuringRangeSubmit(e,"to")} disabled={state.during !== "custom"}/>
      </li>
      <li>
        <label className={styles.filterOption}><input type="checkbox" onChange={e => {dispatch({type : "SET_VIEW_ENABLED", payload : e.currentTarget.checked}); setViewRange({min : 0, max : viewRangeData.length-1})}} checked={state.viewEnabled}/><p>조회수 필터</p></label>
        <Slider range disabled={!state.viewEnabled} min={0} max={viewRangeData.length-1} value={[viewRange.min ?? 0,viewRange.max ?? viewRangeData.length-1]}
        onChange={(values) => {const [startIdx, endIdx] = values; setViewRange({min : startIdx, max : endIdx}); dispatch({type : "SET_VIEW_RANGE", payload : {min : viewRangeData[startIdx], max : viewRangeData[endIdx]}});}}
        tooltip={{formatter: (val) => millify(viewRangeData[val as number]) + " 회"}}/>
        <label className={styles.filterOption}><input type="checkbox" onChange={e => {dispatch({type : "SET_GREAT_ENABLED", payload : e.currentTarget.checked}); setGreatRange({min : 0, max : greatRangeData.length - 1})}} checked={state.greatEnabled}/><p>좋아요 필터</p></label>
        <Slider range disabled={!state.greatEnabled} min={0} max={greatRangeData.length-1} value={[greatRange.min ?? 0,greatRange.max ?? greatRangeData.length-1]}
        onChange={(values) => {const [startIdx, endIdx] = values; setGreatRange({min : startIdx, max : endIdx}); dispatch({type : "SET_GREAT_RANGE", payload : {min : greatRangeData[startIdx], max : greatRangeData[endIdx]}});}}
        tooltip={{formatter: (val) => millify(greatRangeData[val as number]) + " 개"}}/>
      </li>
      <li style={{display:"flex", justifyContent:"space-between"}}>
        <button onClick={onReset} className={styles.reloadBtn + " navItem"}>필터 초기화</button>
      </li>
    </ul>
  )
}

type PageSelectProps = {
  pageNum : number,
  setPageNum : (n : number) => void,
  total : number
}

function PageSelect({pageNum, setPageNum, total} :PageSelectProps){
  return (
    <div style={{width:"100%",height : "50px"}}>
      <Pagination align="center" current={pageNum} onChange={p => setPageNum(p)} total={total} showSizeChanger={false}/>
    </div>
  )
}