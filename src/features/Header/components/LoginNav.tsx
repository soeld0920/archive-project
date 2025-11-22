import { Link } from "react-router-dom";

export function LoginNav(){
  return(
    <nav aria-label="유틸 메뉴">
      <ul>
        <li><Link to="/login">로그인</Link></li>
        <li><Link to="/join">회원가입</Link></li>
      </ul>
    </nav>
  )
}