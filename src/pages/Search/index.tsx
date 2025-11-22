/**
 * Search 페이지 컴포넌트
 * 
 * Feature-Sliced Design 관점에서:
 * - pages/는 라우트에 대응하는 페이지 컴포넌트
 * - features/Search를 조합하여 페이지를 구성
 * 
 * 현재는 features/Search가 완전한 컴포넌트로 구현되어 있어
 * 단순히 re-export하는 형태로 구성
 * 
 * 향후 페이지 레벨에서 필요한 로직이 생기면 (예: SEO, 에러 바운더리 등)
 * 이 파일에서 추가 처리
 */

export { default } from "features/Search";
