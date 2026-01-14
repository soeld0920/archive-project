import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { UserRes } from "shared/types/dto/user";
import getUserUuidFromAccessToken from "shared/lib/utils/getUserUuidFromAccessToken";
import { api } from "axios/api";

//todo : 유저 메뉴 컴포넌트 수정
export default function UserNav(){
  //access 토큰에서 userUuid 추출
  const [userUuid, setUserUuid] = useState<string | null>(null);

  useEffect(() => {
    setUserUuid(getUserUuidFromAccessToken());
  }, []);

  return(
    <nav aria-label="유저 메뉴">
      <ul>
        <li><Link to="/write">글쓰기</Link></li>
        <li><Link to={`/blog/${userUuid}`}>내 블로그</Link></li>
        <li><Link to="/manage">설정</Link></li>
      </ul>
    </nav>
  )
}