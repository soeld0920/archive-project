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
  })
];
