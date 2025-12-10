// 시리즈 정보에 대한 드롭다운 메뉴 컴포넌트
// 시리즈 정보 페이지로 이동, 이전 화, 다음 화로 이동하는 링크 제공

import { Dropdown, Space, type MenuProps } from "antd";
import { Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import { useMemo } from "react";
import type { Series, } from "shared/types/Writing";
import type { WritingLink } from "shared/types/WritingLink";

type SeriesDropdownProps = {
  seriesSummary : Series | undefined | null;
  seriesWritngsLink : {prev : WritingLink | null, next : WritingLink | null} | null;
  pageIdx : number | undefined | null;
}

export default function SeriesDropdown({seriesSummary,seriesWritngsLink,pageIdx} : SeriesDropdownProps){
  if(!seriesSummary || !seriesWritngsLink || pageIdx === undefined || pageIdx === null) return null;

  const {title,UUID} = seriesSummary;

  // 이전 화, 다음 화의 제목 생성 없으면 "제목 없음"
    const prevTitle = useMemo(
    () => (seriesWritngsLink.prev === null ? null : seriesWritngsLink.prev.title ?? "제목 없음"),
    [seriesWritngsLink.prev]
    );
    const nextTitle = useMemo(
      () => (seriesWritngsLink.next === null ? null : seriesWritngsLink.next.title ?? "제목 없음"),
      [seriesWritngsLink.next]
    );

  // 드롭다운 메뉴 아이템 구성
  const items : MenuProps['items'] = useMemo(() => [
    {
      key : "view-series",
      label : (
        <Link to={`/series/${UUID}`}>{title} 시리즈 보러가기</Link>
      )
    },
    {
      type : "divider"
    },
    {
      key : "prepage",
      disabled : seriesWritngsLink.prev === null,
      label : (
        seriesWritngsLink.prev === null ?
        <div>첫번째 글입니다.</div> :
        <Link to={`/writing/${seriesWritngsLink.prev.UUID}`}>이전 화 : {prevTitle}</Link>
      )
    },
    {
      key : "nextPage",
      disabled : seriesWritngsLink.next === null,
      label : (
        seriesWritngsLink.next === null ?
        <div>마지막 글입니다.</div> :
        <Link to={`/writing/${seriesWritngsLink.next.UUID}`}>다음 화 : {nextTitle}</Link>
      ),

    }
  ],[title, UUID, seriesWritngsLink, prevTitle, nextTitle])

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