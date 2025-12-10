/*
  handler의 get 요청을 추상화한 함수.
  url과 DB에서 정보를 얻어오는 repository 함수를 받음.
  url에서 식별자가 없으면 {error : "Not Found identifier at path : {path}"}, { status: 400 } 반환.
  repository 함수로 얻은 정보가 없으면 {error : "Not Found Information at path : {path}"}, { status: 404 } 반환.
  성공시 HttpResponse.json(result, { status: 200 })를 반환.
*/

import { HttpResponse } from "msw";

export default async function mockFetchGetResponse(
  path : URL, repository : (identifier : string) => Promise<any>,
){
  const identifier = path.toString().split('/').pop();
  if(!identifier) return HttpResponse.json({error : "Not Found Identifier at path : " + path.toString()}, { status: 400 });
  const result = await repository(identifier);
  if(!result) return HttpResponse.json({error : "Not Found Information at path : " + path.toString()}, { status: 404 });
  return HttpResponse.json(result, { status: 200 })
}