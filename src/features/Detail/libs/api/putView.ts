/*
  글의 조회수를 증가시킴. 
  이때 body에 로그인한 유저 UUID를 보내야함.
  만약 최근(5분)의 UUID가 일치하는 것이 있으면 이 요청을 무시해야함.

  비로그인은 서버 측에서 IP로 처리.
*/

import { useSelector } from "react-redux";
import type { RootState } from "store";

export default async function putView(UUID : string) : Promise<void>{
  const loginUser = useSelector((state : RootState) => state.login);
  const response = await fetch(`/api/writing/view/${UUID}`, {method : "PUT", body : JSON.stringify(loginUser)});
  return;
}