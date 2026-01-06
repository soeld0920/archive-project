import { Link, useNavigate } from "react-router-dom";

export default function UserNav(){
  return(
    <nav aria-label="유저 메뉴">
      <ul>
        <li><Link to="/write">글쓰기</Link></li>
        <li><Link to="/blog/manage">블로그관리</Link></li>
        <li><Link to="/option">환경설정</Link></li>
      </ul>
    </nav>
  )
}