// 유저 정보에 대한 드롭다운 메뉴 컴포넌트
// 유저 정보 페이지, 작성글 페이지로 이동하는 링크 제공

import { Dropdown, Space, type MenuProps } from "antd";
import millify from "millify";
import { createSearchParams, Link, useSearchParams } from "react-router-dom";
import type { User } from "shared/types/User"
import { FaAngleDown } from "react-icons/fa";
import { useMemo } from "react";

type UserDropdownProps = {
  userSummary : User
}

export default function UserDropdown({userSummary} : UserDropdownProps){
  const {nickname, UUID, bannerImage, totalWriting, totalGreat, totalComment, totalView} = userSummary;
  const [params] = useSearchParams();

  // 페이지로 이동하기 위한 쿼리 문자열 생성
  const searchStr = useMemo(() => {
    const next = new URLSearchParams(params);
    next.set("UUID", UUID);
    return createSearchParams(next).toString();
  }, [params, UUID])
  params.set("UUID", UUID);

  // 드롭다운 메뉴 항목 정의
  const items : MenuProps['items'] = useMemo(() => [
    {
      key : "profile",
      label : (
        <div>
          <div style={{width : "100px", height : "100px", borderRadius : "50px", border : "1px solid var(--border-color)", overflow : "hidden"}}>
            <img src={bannerImage} alt="이미지" width={100} height={100} loading="lazy" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <p className="SubSpan">글 : {millify(totalWriting)} | 댓글 : {millify(totalComment)} <br />
            조회수 : {millify(totalView)} | 좋아요 : {millify(totalGreat)}</p>
        </div>
      )
    },
    {
      type: 'divider'
    },
    {
      key : "view-profile",
      label : (
        <Link to={{ pathname: "/user", search: `?${searchStr}` }}>정보 보기</Link>
      )
    },
    {
      key : "view-writings",
      label : (
        <Link to={{ pathname: "/user/writing", search: `?${searchStr}` }}>작성글 보기</Link>
      )
    }
  ],[nickname, bannerImage, totalWriting, totalComment, totalView, totalGreat, searchStr])

  return(
    <Dropdown menu={{items}}>
      <button type="button" aria-label={`${nickname} 사용자 메뉴 열기`} style={{ all: "unset", cursor: "pointer" }}>
        <Space>
          {nickname}
          <FaAngleDown/>
        </Space>
      </button>
    </Dropdown>
  )
}