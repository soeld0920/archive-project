import { Dropdown, Space, type MenuProps } from "antd";
import millify from "millify";
import { createSearchParams, Link, useSearchParams } from "react-router-dom";
import type { User } from "types/User"
import { FaAngleDown } from "react-icons/fa";
import { SubP } from "./SubSpan";
import { useMemo } from "react";

type UserDropdownProps = {
  userSummary : User
}

export default function UserDropdown({userSummary} : UserDropdownProps){
  const {nickname, UUID, bannerImage, totalWriting, totalGreat, totalComment, totalView} = userSummary;
  const [params] = useSearchParams();

  const searchStr = useMemo(() => {
    const next = new URLSearchParams(params);
    next.set("UUID", UUID);
    return createSearchParams(next).toString();
  }, [params, UUID])

  params.set("UUID", UUID);

  const items : MenuProps['items'] = useMemo(() => [
    {
      key : "profile",
      label : (
        <div>
          <div style={{width : "100px", height : "100px", borderRadius : "50px", border : "1px solid var(--border-color)", overflow : "hidden"}}>
            <img src={bannerImage} alt="이미지" width={100} height={100} loading="lazy" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <SubP>글 : {millify(totalWriting)} | 댓글 : {millify(totalComment)} <br />
            조회수 : {millify(totalView)} | 좋아요 : {millify(totalGreat)}</SubP>
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