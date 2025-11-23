/*
  MSW 핸들러 정의
  - 모든 API 요청 mock을 이곳에 정의합니다.
  - http.get, http.post 등의 메서드로 라우트별 응답을 설정합니다.
*/

import { http, HttpResponse } from 'msw';
import { writingIndex } from './database/writingIndex';
import { loginUser } from './setting';
import getSearchResult from './libs/SearchResult';
import type { MainCategory, SubCategory } from 'shared/types/category';
import { writingMapById } from './database/writing';
import { URL } from 'url';
import { userMapById } from './database/user';
import { seriesMapById } from './database/series';

export const handlers = [
  // 사용자 정보 (헤더용) 예시 핸들러
  http.get('/api/header', () => {
    return HttpResponse.json(
      {
        writingIndex : writingIndex
      },
      { status: 200 }
    );
  }),
  http.get('/api/login',() => {
    return HttpResponse.json(
      {
        loginUser : loginUser,
      },
      { status: 200 }
    );
  }),
  http.get('/api/search',({request}) => {
    const searchParams = new URL(request.url);
    const mainCategory = searchParams.searchParams.get("mainCategory") as MainCategory | undefined;
    const subCategory = searchParams.searchParams.get("subCategory") as SubCategory | undefined;
    const detail = searchParams.searchParams.get("detail") || "";
    return HttpResponse.json(
      {
        writingIndex : getSearchResult({
          mainCategory : mainCategory,
          subCategory : subCategory,
          detail : detail,
        }),
      },
      { status: 200 }
    );
  }),
  //TODO : request의 body에 UUID가 있음, 이걸 저장하고 중복 체크 후 조회수를 증가시켜야함.
  http.put('api/writing/view/:UUID', ({request}) => {
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
  http.get('/api/user/:UUID', ({request}) => {
    const url = new URL(request.url);
    const UUID = url.pathname.split('/').pop();
    if(!UUID) return HttpResponse.json({error : "Not Found UUID"}, { status: 400 });
    const user = userMapById.get(UUID);
    if(!user) return HttpResponse.json({error : "Not Found User"}, { status: 404 });
    return HttpResponse.json({user : user}, { status: 200 });
  }),
  http.get('api/series/:UUID',({request}) => {
    const url = new URL(request.url);
    const UUID = url.pathname.split('/').pop();
    if(!UUID) return HttpResponse.json({error : "Not Found UUID"}, { status: 400 });
    const series = seriesMapById.get(UUID);
    if(!series) return HttpResponse.json({error : "Not Found Series"}, { status: 404 });
    return HttpResponse.json({series : series}, { status: 200 });
  })
];
