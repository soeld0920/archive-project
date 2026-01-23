// 시리즈 정보에 대한 드롭다운 메뉴 컴포넌트
// 시리즈 정보 페이지로 이동, 이전 화, 다음 화로 이동하는 링크 제공

import { Dropdown, Space, type MenuProps } from "antd";
import { Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import { useMemo, useState, useEffect } from "react";
import type { SeriesNavigationResDto } from "shared/types/dto/SeriesNavigationResDto";
import { api } from "axios/api";

type SeriesDropdownProps = {
  currentWritingUuid : string;
  seriesUuid : string;
  seriesTitle : string;
}

export default function SeriesDropdown({currentWritingUuid, seriesUuid, seriesTitle} : SeriesDropdownProps){
  const [navigationData, setNavigationData] = useState<SeriesNavigationResDto | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNavigationData = async () => {
    if(isLoading) return;
    setIsLoading(true);
    try {
      const response = await api.get(`/series/${seriesUuid}/navigation`, {
        params : {
          currentWritingUuid,
        }
      })
        .then(res => res.data);
      setNavigationData(response);
      console.log("응답 도착!")
    } catch (error) {
      console.error("Failed to fetch series navigation data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // currentWritingUuid가 바뀌면 데이터를 초기화하고 다시 로드
  useEffect(() => {
    setNavigationData(null);
    // 드롭다운이 열려있을 때만 자동으로 로드 (선택적)
    // 필요하면 여기서 바로 fetchNavigationData() 호출 가능
  }, [currentWritingUuid, seriesUuid]);

  // 드롭다운 메뉴 아이템 구성
  const items : MenuProps['items'] = useMemo(() => {
    if(!navigationData) return [];

    const hasPrev = navigationData.prevWritingUuid && navigationData.prevWritingUuid.length > 0;
    const hasNext = navigationData.nextWritingUuid && navigationData.nextWritingUuid.length > 0;

    return [
      {
        key : "view-series",
        label : (
          <Link to={`/search/series?detail=${navigationData.seriesUuid}`}>{navigationData.seriesTitle} 시리즈 보러가기</Link>
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
      <button type="button" aria-label={`${seriesTitle || seriesUuid} 시리즈 메뉴 열기`} style={{ all: "unset", cursor: "pointer" }}>
        <Space>
          {seriesTitle || "제목 없음"}
          <FaAngleDown/>
        </Space>
      </button>
    </Dropdown>
  )
}