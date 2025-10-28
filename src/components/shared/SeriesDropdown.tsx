import { Dropdown, Space, type MenuProps } from "antd";
import { createSearchParams, Link, useSearchParams } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import { useMemo } from "react";
import type { Series, WritingIndex } from "types/Writing";
import { clearParams } from "lib/clearParams";

type SeriesDropdownProps = {
  seriesSummary : Series | undefined;
  writingIndexs : WritingIndex[] | undefined;
  pageIdx : number | undefined;
}

export default function SeriesDropdown({seriesSummary,writingIndexs,pageIdx} : SeriesDropdownProps){
  if(!seriesSummary || writingIndexs === undefined || pageIdx === undefined) return null;

  const {title,UUID} = seriesSummary;
  const [params] = useSearchParams();
  const paramsString = params.toString()

  const searchStr = useMemo(() => {
    const next = clearParams(params);
    next.set("UUID", UUID);
    return createSearchParams(next).toString();
  }, [paramsString, UUID])

  const prevIdx = useMemo(() => pageIdx > 0 ? pageIdx - 1 : null,[pageIdx, writingIndexs?.length])
  const nextIdx = useMemo(() => pageIdx < writingIndexs.length - 1 ? pageIdx + 1 : null,[pageIdx, writingIndexs?.length])

  const prevPageStr = useMemo(() => {
    if(prevIdx === null) return null;
    const next = clearParams(params);
    next.set("UUID", writingIndexs[prevIdx].UUID);
    return createSearchParams(next).toString();
  }, [paramsString, prevIdx, writingIndexs])

  const nextPageStr = useMemo(() => {
    if(nextIdx === null) return null;
    const next = clearParams(params);
    next.set("UUID", writingIndexs[nextIdx].UUID);
    return createSearchParams(next).toString();
  }, [paramsString, nextIdx, writingIndexs])

    const prevTitle = useMemo(
    () => (prevIdx === null ? null : writingIndexs[prevIdx]?.title ?? "제목 없음"),
    [prevIdx, writingIndexs]
    );
    const nextTitle = useMemo(
      () => (nextIdx === null ? null : writingIndexs[nextIdx]?.title ?? "제목 없음"),
      [nextIdx, writingIndexs]
    );

  const items : MenuProps['items'] = useMemo(() => [
    {
      key : "view-series",
      label : (
        <Link to={{ pathname: "/series", search: `?${searchStr}` }}>{title} 시리즈 보러가기</Link>
      )
    },
    {
      type : "divider"
    },
    {
      key : "prepage",
      disabled : prevIdx === null,
      label : (
        prevIdx === null ?
        <div>첫번째 글입니다.</div> :
        <Link to={{ pathname: "/page", search: `?${prevPageStr}` }}>이전 화 : {prevTitle}</Link>
      )
    },
    {
      key : "nextPage",
      disabled : nextIdx === null,
      label : (
        nextIdx === null ?
        <div>마지막 글입니다.</div> :
        <Link to={{ pathname: "/page", search: `?${nextPageStr}` }}>다음 화 : {nextTitle}</Link>
      ),

    }
  ],[title, searchStr, prevIdx, nextIdx, prevPageStr, nextPageStr, prevTitle, nextTitle])

  return(
    <Dropdown menu={{items}}>
      <button type="button" aria-label={`${title} 사용자 메뉴 열기`} style={{ all: "unset", cursor: "pointer" }}>
        <Space>
          {title}
          <FaAngleDown/>
        </Space>
      </button>
    </Dropdown>
  )
}