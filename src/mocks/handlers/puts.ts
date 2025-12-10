import { userMapById } from "mocks/database/user";
import { writingMapById } from "mocks/database/writing";
import { http, HttpResponse } from "msw";
import type { Comment, CommentRes } from "shared/types/Writing";

export const puts = [
  //TODO : request의 body에 UUID가 있음, 이걸 저장하고 중복 체크 후 조회수를 증가시켜야함.
  http.put('/api/writing/view/:UUID', async ({request}) => {
    const url = new URL(request.url);
    const UUID = url.pathname.split('/').pop();
    if(!UUID) return HttpResponse.json(
      {
        error : "Not Found UUID",
      },
      { status: 400 }
    );
    const writing = writingMapById.get(UUID);
    if(!writing) return HttpResponse.json({error : "Not Found Writing"}, { status: 404 });
    writing.view++;
    return HttpResponse.json({message : "Success"}, { status: 200 });
  }),
  /*요청을 받으면 다음을 실행.
    1. UUID 여부 확인
    2. 유저의 좋아요 누른 글 목록 확인 후 옵션 결정
    3. 켜기이면 목록에 추가 후 +1, 끄기이면 목록에서 제거 후 -1
    4. 좋아요 수 업데이트
    5. 유저 업데이트
    5. 성공 응답(신규 좋아요 수와 증감 여부)
  */
  http.put('/api/writing/great/:UUID', async ({request}) => {
    const body = await request.json() as { userUUID: string };;
    if(!body) return HttpResponse.json({error : "Not Found Body"}, { status: 400 });
    const userUUID = body.userUUID;
    const url = new URL(request.url);
    const writingUUID = url.pathname.split('/').pop();
    if(!writingUUID || !userUUID) return HttpResponse.json({error : "Not Found UUID"}, { status: 400 });
    const writing = writingMapById.get(writingUUID);
    if(!writing) return HttpResponse.json({error : "Not Found Writing"}, { status: 404 });
    const user = userMapById.get(userUUID);
    if(!user) return HttpResponse.json({error : "Not Found User"}, { status: 404 });
    
    let toggled : boolean = !user.greatPostIds.includes(writingUUID);
    
    if(toggled){
      writing.great++;
      user.greatPostIds.push(writingUUID);
    } else {
      writing.great--;
      user.greatPostIds = user.greatPostIds.filter(id => id !== writingUUID);
    }

    return HttpResponse.json({message : "Success", great : writing.great, toggled : toggled}, { status: 200 });
  }),
  http.put('/api/writing/bookmark', async ({request}) => {
    const body = await request.json() as { writingUUID: string, userUUID: string };
    if(!body) return HttpResponse.json({error : "Not Found Body"}, { status: 400 });
    const writingUUID = body.writingUUID;
    const userUUID = body.userUUID;
    if(!writingUUID || !userUUID) return HttpResponse.json({error : "Not Found UUID"}, { status: 400 });
    
    const writing = writingMapById.get(writingUUID);
    if(!writing) return HttpResponse.json({error : "Not Found Writing"}, { status: 404 });
    const user = userMapById.get(userUUID);
    if(!user) return HttpResponse.json({error : "Not Found User"}, { status: 404 });
  
    let toggled : boolean = !user.bookmarkedPostIds.includes(writingUUID);
    if(toggled){
      user.bookmarkedPostIds.push(writingUUID);
    } else {
      user.bookmarkedPostIds = user.bookmarkedPostIds.filter(id => id !== writingUUID);
    }
    return HttpResponse.json({message : "Success", toggled : toggled}, { status: 200 });
  }),
  http.put('/api/comments/:UUID', async ({request}) => {
    const body = await request.json() as { content: CommentRes };
    if(!body) return HttpResponse.json({error : "Not Found Body"}, { status: 400 });
    const content : CommentRes = body.content;
    if(!content) return HttpResponse.json({error : "Not Found Content"}, { status: 400 });
    const url = new URL(request.url);
    const writingUUID = url.pathname.split('/').pop();
    if(!writingUUID) return HttpResponse.json({error : "Not Found UUID"}, { status: 400 });
    const writing = writingMapById.get(writingUUID);
    if(!writing) return HttpResponse.json({error : "Not Found Writing"}, { status: 404 });
    writing.comment.push({writer : content.writer.UUID, date : content.date, content : content.content});
    return HttpResponse.json({message : "Success", content : content}, { status: 200 });
  }),
]