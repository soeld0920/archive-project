import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import getUserUuidFromAccessToken from "shared/lib/utils/getUserUuidFromAccessToken";
import { FaPencilAlt } from "react-icons/fa";
import { IoIosPaper, IoIosSettings } from "react-icons/io";
//todo : 유저 메뉴 컴포넌트 수정
export default function UserNav(){
  //access 토큰에서 userUuid 추출
  const [userUuid, setUserUuid] = useState<string | null>(null);

  useEffect(() => {
    setUserUuid(getUserUuidFromAccessToken());
  }, []);

  return(
    <nav aria-label="유저 메뉴">
      <ul className="flex gap-7">
        <li><Link to="/write" className="flex items-center gap-3"><FaPencilAlt />글쓰기</Link></li>
        <li><Link to={`/blog/${userUuid}`} className="flex items-center gap-3"><IoIosPaper />내 블로그</Link></li>
        <li><Link to="/manage" className="flex items-center gap-3"><IoIosSettings />설정</Link></li>
      </ul>
    </nav>
  )
}