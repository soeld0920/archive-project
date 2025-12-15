import type HttpError from "shared/types/HttpError";
import type { Auth } from "shared/types/auth";

export default async function refreshFetch() : Promise<void> {
  const response : Auth = await fetch(`/api/login/refresh`, {method : "POST"}).then(res => res.json()).catch((e : HttpError) => {throw e});
  localStorage.setItem("accessToken", response.accessToken);
  localStorage.setItem("refreshToken", response.refreshToken);
}