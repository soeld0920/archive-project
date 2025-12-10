/*
  유저 및 글의 정보는 body로 전달
  유저를 찾아 글을 저장.
  성공 여부 및 추가인지 제거인지 반환
*/

export default async function putBookmark(writingUUID : string, userUUID : string){
  const response = await fetch(`/api/writing/bookmark`,{
    method : "put",
    body : JSON.stringify({writingUUID, userUUID})
  });
  if(!response.ok) throw new Error("Failed to put bookmark")
  return response.json();
}  