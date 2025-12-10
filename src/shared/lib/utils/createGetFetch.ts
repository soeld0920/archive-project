/*
  get 요청을 추상화한 함수.
  path에 따라 요청을 보내고 결과를 반환하는 함수를 반환.
*/

import HttpError from "shared/types/HttpError";

export default async function createGetFetch<T>(path : string) : Promise<T>{
  const response = await fetch(path, {method : "GET"});
  if(!response.ok) throw new HttpError(response.status, response.statusText);
  return response.json() as T;
}