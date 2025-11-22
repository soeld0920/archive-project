import type { ShouldRevalidateFunctionArgs } from "react-router-dom";

export default function writingShouldRevalidate(
  {currentUrl, nextUrl, defaultShouldRevalidate} : ShouldRevalidateFunctionArgs
) : boolean {
  // revalidate 호출로 인한 새로고침 허용
  if(defaultShouldRevalidate) return true
  if(nextUrl.search !== currentUrl.search) return true;
  return false
}