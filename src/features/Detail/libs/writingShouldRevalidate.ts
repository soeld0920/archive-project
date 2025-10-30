import type { ShouldRevalidateFunctionArgs } from "react-router-dom";

export default function writingShouldRevalidate(
  {currentUrl, nextUrl, formMethod, formAction, formData, defaultShouldRevalidate} : ShouldRevalidateFunctionArgs
) : boolean {
  if(defaultShouldRevalidate) return true
  if(nextUrl.search !== currentUrl.search) return true;
  return false
}