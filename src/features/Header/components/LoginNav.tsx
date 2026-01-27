import { MdOutlineLogin, MdOutlinePersonAdd } from "react-icons/md";
import { Link } from "react-router-dom";

export function LoginNav(){
  return(
    <nav aria-label="유틸 메뉴">
      <ul className="flex gap-7">
        <li><Link to="/login" className="flex items-center gap-3"><MdOutlineLogin />로그인</Link></li>
        <li><Link to="/join" className="flex items-center gap-3"><MdOutlinePersonAdd />회원가입</Link></li>
      </ul>
    </nav>
  )
}