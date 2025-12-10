/*
  좋아요를 변동시키는 함수.
  body에 좋아요를 누른 유저의 UUID를 보내 좋아요 라스트를 업데이트함. 
  반환값은 업데이트된 좋아요 수와 성공 여부
*/

export default async function putGreat(writingUUID : string, userUUID : string){
  const response = await fetch(`/api/writing/great/${writingUUID}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({userUUID : userUUID}),
  });
  if(!response.ok) throw new Error("Failed to put great")
  return response.json();
}