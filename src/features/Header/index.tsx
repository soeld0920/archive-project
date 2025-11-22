/*
  페이지의 헤더 컴포넌트
  TODO : 서브 기능 버튼들 교체 필요
    로그인 X
    - 로그인하고 글 쓰기 등 로그인 권유 버튼
    로그인 O
    - 알림
    - 북마크
    - 프로필 
    - 글 작성
*/

import styles from "./Header.module.css"
import logo from "assets/img/logo-main.png"
import Wrapper from "shared/components/blocks/Wrapper";
// import { SearchDiv } from "features/Header/components/SearchDiv";
import { LoginNav } from "./components/LoginNav";
import { Link } from "react-router-dom";
import { SubNav } from "./components/SubNav";
import { SearchDiv } from "./components/SearchDiv";
import { OpenPopupProvider } from "./context/openPopupContext";
import { CategoryProvider } from "./context/categoryContext";
import { SelectCategory } from "./components/SelectCategory";
import { CategoryPopupProvider } from "./context/categoryPopup";

export default function Header(){
  return(
    <CategoryProvider>
      <OpenPopupProvider>
        <CategoryPopupProvider>
          <HeaderContent/>
        </CategoryPopupProvider>
      </OpenPopupProvider>
    </CategoryProvider>
  )
}


function HeaderContent(){
  return(
    <header className={styles.header}>

      {/* top */}
      <div className={styles.topNav}>
        <Wrapper className={styles.wrapper}>
          
          {/* 사이트 문구 */}
          <span className="highlight">한국어로 배우는 쉬운 컴퓨터공학</span>

          {/* 로그인 / 유저 네비게이션 */}
          <LoginNav/>
        </Wrapper>
      </div>


      {/* main */}
      <div className={styles.mainNav}>
        <Wrapper  className={styles.wrapper}>
          {/* logo */}
          <Link to="/" aria-label="홈으로"><img src={logo} alt="로고이미지" /></Link>

          {/* 검색창과 카테고리 선택 */}
          <div className={styles.searchContainer}>
            <SearchDiv/>
            <SelectCategory/>
          </div>

          {/* 서브 기능 */}
          <SubNav/>
        </Wrapper>
      </div>
    </header>
  )
}

