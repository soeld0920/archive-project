import UserProfileCard from "shared/components/features/UserProfileInfo";
import styles from "../style/ManageNav.module.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ManageNav(){
  const location = useLocation();
  const [pathname, setPathname] = useState(location.pathname.split("/").pop());

  useEffect(() => {
    setPathname(location.pathname.split("/").pop());
  }, [location.pathname]);

  return(
    <aside className={styles.wrapper}>
      <UserProfileCard/>
      <nav className={styles.navList}>
        <ul>
          <li>
            <Link to="/manage" className={pathname === "manage" ? styles.active : ""}>메인 화면</Link>
          </li>
          <li>
            <Link to="/manage/userInfo" className={pathname === "userInfo" ? styles.active : ""}>유저 정보 설정</Link>
          </li>
          <li>
            <Link to="/manage/series" className={pathname === "series" ? styles.active : ""}>시리즈 설정</Link>
          </li>
          <li>
            <Link to="/manage/textStyle" className={pathname === "textStyle" ? styles.active : ""}>글꼴 설정</Link>
          </li>
          <li>
            <Link to="/manage/post" className={pathname === "post" ? styles.active : ""}>글 설정</Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}