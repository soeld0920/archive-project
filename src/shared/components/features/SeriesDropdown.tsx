// 시리즈 정보에 대한 드롭다운 메뉴 컴포넌트
// 시리즈 정보 페이지로 이동, 이전 화, 다음 화로 이동하는 링크 제공

import { Dropdown, Space, type MenuProps } from "antd";
import { createSearchParams, Link, useSearchParams } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import { useMemo } from "react";
import type { Series, WritingIndex } from "shared/types/Writing";
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

  // 현재 시리즈와 페이지 정보를 기반으로 시리즈 페이지 링크 생성
  const searchStr = useMemo(() => {
    const next = clearParams(params);
    next.set("UUID", UUID);
    return createSearchParams(next).toString();
  }, [paramsString, UUID])

  // 이전 화, 다음 화의 인덱스 계산 없으면 null
  const prevIdx = useMemo(() => pageIdx > 0 ? pageIdx - 1 : null,[pageIdx, writingIndexs?.length])
  const nextIdx = useMemo(() => pageIdx < writingIndexs.length - 1 ? pageIdx + 1 : null,[pageIdx, writingIndexs?.length])

  // 이전 화, 다음 화의 링크 생성 없으면 null
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

  // 이전 화, 다음 화의 제목 생성 없으면 "제목 없음"
    const prevTitle = useMemo(
    () => (prevIdx === null ? null : writingIndexs[prevIdx]?.title ?? "제목 없음"),
    [prevIdx, writingIndexs]
    );
    const nextTitle = useMemo(
      () => (nextIdx === null ? null : writingIndexs[nextIdx]?.title ?? "제목 없음"),
      [nextIdx, writingIndexs]
    );

  // 드롭다운 메뉴 아이템 구성
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