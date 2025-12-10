/*

todo
타입 정의 분리: RecommandTypes 등 컴포넌트 내부 타입을 features/Home/types/로 이동

API 호출 리팩토링: mainLoader에서 mocks 핸들러 직접 import 제거, shared/lib/api/로 이동

FilterState 컨텍스트 통합: Popular과 Recommand의 중복된 FilterState 컨텍스트를 shared/context/로 통합

컴포넌트 구조 개선: 각 섹션(Popular, Recommand)의 Provider 구조를 features/Home/index.tsx에서 중앙 관리

스타일 파일 위치 확인: Popular.module.css와 Recommand.module.css가 올바른 위치에 있는지 확인 및 필요시 이동

에러 처리 추가: API 호출 및 데이터 로딩 시 에러 처리 및 로딩 상태 관리 추가

*/


import HomePage from "features/Home/index";

export default function Home(){
  return (
    <HomePage/>
  )
}