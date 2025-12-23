// 유저 프로필 정보 카드 컴포넌트
// 로그인 상태에 따라 다른 UI를 렌더링
import styles from "shared/styles/modules/UserInfo.module.css"
import { Link } from "react-router-dom"
import millify from "millify"
import { useEffect, useState } from "react"
import type { FindUserResDto } from "shared/types/dto/user"
import { api } from "axois/api"

export default function UserProfileCard(){
  //"" = 로그인 X
  if(!localStorage.getItem("accessToken")) return (
    <div className={styles.loginWrapper}>
      <div className={styles.profilePicture}>
        <img src="src/assets/img/profile-fallback.png" alt="비로그인 프사" loading="lazy"/>
      </div>
      <div className={styles.profileInfo}>
        <p className="HighlightSpan">비로그인 상태입니다.</p>
      </div>
      <div className={styles.profileNav}>
        <Link to="/login" className="navItem">로그인하러가기</Link>
      </div>
    </div>
  )

  const [userData, setUserData] = useState<FindUserResDto | null>(null);


  useEffect(() => {
    const fetchUserData = async () => {
      const response = await api.get("/user/me");
      setUserData(response.data);
    }
    fetchUserData();
  }, []);
  
  if(!userData) return <div className={styles.loginWrapper}>유저 정보를 불러오는 중입니다...</div>;

  // 로그인 O
  return (
  <div className={styles.loginWrapper}>
    <div className={styles.profilePicture}>
      <img src={userData.banner || "src/assets/img/profile-fallback.png"} alt={`${userData.userName}의 프로필 이미지`} loading="lazy" onError={(e) => (e.currentTarget.src = 'src/assets/img/profile-fallback.png')}/>
    </div>
    <div className={styles.profileInfo}>
      <p><span className="HighlightSpan">{userData.userName}</span>님 반갑습니다.</p>
      <p className="SubSpan">글 {millify(userData.totalWriting, { precision: 1 })} | 댓글 {millify(userData.totalComment, { precision: 1 })} | 조회수 {millify(userData.totalView, { precision: 1 })} | 좋아요 {millify(userData.totalGreat, { precision: 1 })}</p>
    </div>
    <ul className={styles.profileNav}>
      <li>
        <Link to="/write" className="navItem">글쓰기</Link>
      </li>
      <li>
        <Link to="/blog/manage" className="navItem">블로그관리</Link>
      </li>
      <li>
        <Link to="/option" className="navItem">환경설정</Link>
      </li>
    </ul>
  </div>)
}