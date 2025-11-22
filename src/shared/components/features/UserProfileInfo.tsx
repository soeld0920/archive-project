// 유저 프로필 정보 카드 컴포넌트
// 로그인 상태에 따라 다른 UI를 렌더링
import styles from "shared/styles/modules/UserInfo.module.css"
import { Link, Navigate, useSearchParams } from "react-router-dom"
import millify from "millify"
import { userList } from "mocks/database/user"

export default function UserProfileCard(){
  const [params] = useSearchParams()
  const userUUID = params.get("login") || "";

  //"" = 로그인 X
  if(userUUID === "") return (
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

  // 로그인 UUID로 유저 정보 찾기
  const user = userList.find(u => u.UUID === userUUID)

  // 잘못된 UUID = 유저 정보 없음
  if(!user) return <Navigate to="/404" replace/>;
    const {bannerImage,nickname,totalWriting,totalComment,totalView,totalGreat} = user;

  // 로그인 O
  return (
  <div className={styles.loginWrapper}>
    <div className={styles.profilePicture}>
      <img src={bannerImage} alt={`${nickname}의 프로필 이미지`} loading="lazy" onError={(e) => (e.currentTarget.src = 'src/assets/img/profile-fallback.png')}/>
    </div>
    <div className={styles.profileInfo}>
      <p><span className="HighlightSpan">{nickname}</span>님 반갑습니다.</p>
      <p className="SubSpan">글 {millify(totalWriting, { precision: 1 })} | 댓글 {millify(totalComment, { precision: 1 })} | 조회수 {millify(totalView, { precision: 1 })} | 좋아요 {millify(totalGreat, { precision: 1 })}</p>
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