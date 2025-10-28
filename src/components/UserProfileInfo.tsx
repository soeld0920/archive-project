import styles from "styles/modules/UserInfo.module.css"
import {HighlightP, HighlightSpan} from "./shared/HighlightSpan"
import { SubP } from "./shared/SubSpan"
import { Link, Navigate } from "react-router-dom"
//millify : 1000 => 1k
import millify from "millify"
import { userList } from "content/user"

type UserInfoProps = {
  userUUID : string
}

export default function UserProfileCard({userUUID} : UserInfoProps){
  //"" = 로그인 X
  if(userUUID === "") return (
    <div className={styles.loginWrapper}>
      <div className={styles.profilePicture}>
        <img src="src/assets/img/profile-fallback.png" alt="비로그인 프사" loading="lazy"/>
      </div>
      <div className={styles.profileInfo}>
        <HighlightP>비로그인 상태입니다.</HighlightP>
      </div>
      <div className={styles.profileNav}>
        <Link to="/login" className="navItem">로그인하러가기</Link>
      </div>
    </div>
  )

  const user = userList.find(u => u.UUID === userUUID)
  if(!user) return <Navigate to="/404" replace/>;
    const {bannerImage,nickname,totalWriting,totalComment,totalView,totalGreat} = user;
  return (
  <div className={styles.loginWrapper}>
    <div className={styles.profilePicture}>
      <img src={bannerImage} alt={`${nickname}의 프로필 이미지`} loading="lazy" onError={(e) => (e.currentTarget.src = 'src/assets/img/profile-fallback.png')}/>
    </div>
    <div className={styles.profileInfo}>
      <p><HighlightSpan>{nickname}</HighlightSpan>님 반갑습니다.</p>
      <SubP>글 {millify(totalWriting, { precision: 1 })} | 댓글 {millify(totalComment, { precision: 1 })} | 조회수 {millify(totalView, { precision: 1 })} | 좋아요 {millify(totalGreat, { precision: 1 })}</SubP>
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