import type { ShouldRevalidateFunctionArgs } from "react-router-dom";

export default async function writingShouldRevalidate({currentUrl, nextUrl, formMethod, formAction, formData} : ShouldRevalidateFunctionArgs) {
  if(nextUrl.search !== currentUrl.search) return true;

}