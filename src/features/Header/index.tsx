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

import logo from "assets/img/logo-main.png"
import Wrapper from "shared/components/blocks/Wrapper";
// import { SearchDiv } from "features/Header/components/SearchDiv";
import { LoginNav } from "./components/LoginNav";
import { Link } from "react-router-dom";
import { SearchDiv } from "./components/SearchDiv";
import { CategoryProvider } from "./context/categoryContext";
import { useEffect, useState } from "react";
import isSignin from "shared/lib/utils/isSignin";
import UserNav from "./components/UserNav";
import { OpenSelectCategoryProvider, useOpenSelectCategoryContext } from "./context/openSelectCategoryContext";

export default function Header(){
  return(
    <CategoryProvider>
      <OpenSelectCategoryProvider>
          <HeaderContent/>
      </OpenSelectCategoryProvider>
    </CategoryProvider>
  )
}


function HeaderContent(){
  const [signIn, setSignIn] = useState<boolean>(false);
  const {containerRef} = useOpenSelectCategoryContext();
  useEffect(() => {
    setSignIn(isSignin());
  }, []);

  return(
    <header className="w-full h-auto">

      {/* top */}
      <div className="w-full h-10 my-2">
        <Wrapper className="flex justify-between items-center">
          
          {/* 사이트 문구 */}
          <span className="text-blue-600 text-2xl font-[DungGeunMo]">한국어로 배우는 쉬운 컴퓨터공학</span>

          {/* 로그인 / 유저 네비게이션 */}
          {signIn ? <UserNav/> : <LoginNav/>}
        </Wrapper>
      </div>


      {/* main */}
      <div className="w-full h-35 bg-gray-300">
        <Wrapper className="flex justify-between items-center py-3">
          {/* logo */}
          <Link to="/" aria-label="홈으로" className="h-full inline-block"><img src={logo} alt="로고이미지" className="h-full inline-block"/></Link>

          {/* 검색창과 카테고리 선택 */}
          <div className="relative w-1/2 max-w-150 h-2/3" ref={containerRef}>
            <SearchDiv/>
            {/* <SelectCategory/> */}
          </div>

          {/* 서브 기능 */}
          <div style={{width: "20%", height: "100%"}}></div>
        </Wrapper>
      </div>
    </header>
  )
}

