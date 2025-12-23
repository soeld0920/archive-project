// 유저 정보에 대한 드롭다운 메뉴 컴포넌트
// 유저 정보 페이지, 작성글 페이지로 이동하는 링크 제공

import { Dropdown, Space, type MenuProps } from "antd";
import { Link, useSearchParams } from "react-router-dom";
import type { FindUserResDto } from "shared/types/dto/user"
import { FaAngleDown } from "react-icons/fa";
import { useMemo, useState } from "react";
import type HttpError from "shared/types/HttpError";

type UserDropdownProps = {
  userUuid : string,
  userName : string
}

export default function UserDropdown({userUuid, userName} : UserDropdownProps){
  const [params] = useSearchParams();
  const [userData, setUserData] = useState<FindUserResDto | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 페이지로 이동하기 위한 쿼리 문자열 생성
  params.set("UUID", userUuid);

  const fetchUserData = async () => {
    if(userData || isLoading) return;
    setIsLoading(true);
    try {
      const response = await fetch(`/api/user/${userUuid}`)
        .then(res => res.json())
        .catch((e : HttpError) => {throw e});
      
      if(response.error) {
        console.error(response.error);
        setIsLoading(false);
        return;
      }
      
      setUserData(response);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 드롭다운 메뉴 항목 정의
  const items : MenuProps['items'] = useMemo(() => {
    if(!userData) return [];
    
    return [
      {
        key : "profile",
        label : (
          <div>
            <div style={{width : "100px", height : "100px", borderRadius : "50px", border : "1px solid var(--border-color)", overflow : "hidden"}}>
              <img src={userData.banner} alt="이미지" width={100} height={100} loading="lazy" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <p className="SubSpan">{userData.bio || "소개가 없습니다."}</p>
          </div>
        )
      },
      {
        type: 'divider'
      },
      {
        key : "view-profile",
        label : (
          <Link to={{ pathname: "/user", search: `?${params.toString()}` }}>정보 보기</Link>
        )
      },
      {
        key : "view-writings",
        label : (
          <Link to={{ pathname: "/user/writing", search: `?${params.toString()}` }}>작성글 보기</Link>
        )
      }
    ];
  },[userData, params])

  return(
    <Dropdown 
      menu={{items}} 
      onOpenChange={(open) => {
        if(open) {
          fetchUserData();
        }
      }}
    >
      <button type="button" aria-label={`${userData?.userName || userUuid} 사용자 메뉴 열기`} style={{ all: "unset", cursor: "pointer" }}>
        <Space>
          {userName || userUuid}
          <FaAngleDown/>
        </Space>
      </button>
    </Dropdown>
  )
}