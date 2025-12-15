// 시리즈 정보에 대한 드롭다운 메뉴 컴포넌트
// 시리즈 정보 페이지로 이동, 이전 화, 다음 화로 이동하는 링크 제공

import { Dropdown, Space, type MenuProps } from "antd";
import { Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import { useMemo, useState } from "react";
import type { SeriesNavigationResDto } from "shared/types/SeriesNavigationResDto";
import type HttpError from "shared/types/HttpError";

type SeriesDropdownProps = {
  seriesUuid : string
}

export default function SeriesDropdown({seriesUuid} : SeriesDropdownProps){
  const [navigationData, setNavigationData] = useState<SeriesNavigationResDto | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNavigationData = async () => {
    if(navigationData || isLoading) return;
    setIsLoading(true);
    try {
      const response = await fetch(`/api/series/${seriesUuid}/navigation`)
        .then(res => res.json())
        .catch((e : HttpError) => {throw e});
      
      if(response.error) {
        console.error(response.error);
        setIsLoading(false);
        return;
      }
      
      setNavigationData(response);
    } catch (error) {
      console.error("Failed to fetch series navigation data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 드롭다운 메뉴 아이템 구성
  const items : MenuProps['items'] = useMemo(() => {
    if(!navigationData) return [];

    const hasPrev = navigationData.prevWritingUuid && navigationData.prevWritingUuid.length > 0;
    const hasNext = navigationData.nextWritingUuid && navigationData.nextWritingUuid.length > 0;

    return [
      {
        key : "view-series",
        label : (
          <Link to={`/series/${navigationData.seriesUuid}`}>{navigationData.seriesTitle} 시리즈 보러가기</Link>
        )
      },
      {
        type : "divider"
      },
      {
        key : "prepage",
        disabled : !hasPrev,
        label : (
          !hasPrev ?
          <div>첫번째 글입니다.</div> :
          <Link to={`/writing/${navigationData.prevWritingUuid}`}>이전 화 : {navigationData.prevWritingTitle || "제목 없음"}</Link>
        )
      },
      {
        key : "nextPage",
        disabled : !hasNext,
        label : (
          !hasNext ?
          <div>마지막 글입니다.</div> :
          <Link to={`/writing/${navigationData.nextWritingUuid}`}>다음 화 : {navigationData.nextWritingTitle || "제목 없음"}</Link>
        ),
      }
    ];
  },[navigationData])

  return(
    <Dropdown 
      menu={{items}} 
      onOpenChange={(open) => {
        if(open) {
          fetchNavigationData();
        }
      }}
    >
      <button type="button" aria-label={`${navigationData?.seriesTitle || seriesUuid} 시리즈 메뉴 열기`} style={{ all: "unset", cursor: "pointer" }}>
        <Space>
          {navigationData?.seriesTitle || seriesUuid}
          <FaAngleDown/>
        </Space>
      </button>
    </Dropdown>
  )
}