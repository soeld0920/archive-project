import { seriesMapById } from "mocks/database/series";
import { userMapById } from "mocks/database/user";
import { writingMapById } from "mocks/database/writing";
import { writingIndex } from "mocks/database/writingIndex";
import { binnerWritingUpdate, binnerExplanationList } from "mocks/database/binnerWriting";
import { loginUser } from "mocks/setting";
import mockFetchGetResponse from "mocks/utils/mockFetchGetResponse";
import { http, HttpResponse } from "msw";
import type { MainCategory, SubCategory } from "shared/types/category";
import { toWritingGlobKey } from "../libs/toWritingGlobKey";
import getSearchResult from "mocks/libs/SearchResult";
import { subDays, startOfToday, parseISO } from "date-fns";

export const gets = [
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
  http.get('/api/writing/popular',() => {
    return HttpResponse.json(
      {
        writingIndex : writingIndex,
      },
      { status: 200 }
    );
  }),
  http.get('/api/writing/binner', () => {
    const writingIndexWithExplan = binnerExplanationList.map(explanation => {
      const writing = writingIndex.find(w => w.UUID === explanation.UUID);
      if (!writing) {
        throw new Error(`Writing not found for UUID: ${explanation.UUID}`);
      }
      return {
        writing,
        explan: {
          title: explanation.title,
          description: explanation.description,
        },
      };
    });

    return HttpResponse.json(
      {
        updateAt: binnerWritingUpdate.toISOString(),
        writingIndexWithExplan,
      },
      { status: 200 }
    );
  }),
  http.get('/api/writing/recent', () => {
    const today = startOfToday();
    const threeDaysAgo = subDays(today, 3);
    
    const recentWritings = writingIndex.filter(w => {
      const writingDate = parseISO(w.date);
      return writingDate >= threeDaysAgo && writingDate <= today;
    });

    return HttpResponse.json(
      {
        writingIndex: recentWritings,
      },
      { status: 200 }
    );
  }),
  http.get('/api/user/:UUID', ({request}) => {
    const url = new URL(request.url);
    return mockFetchGetResponse(url, async (i) => userMapById.get(i));
  }),
  http.get('/api/series/:UUID',({request}) => {
    const url = new URL(request.url);
    return mockFetchGetResponse(url, async (i) => seriesMapById.get(i));
  }),
  http.get('/api/writing/:UUID',({request}) => {
    const url = new URL(request.url);
    return mockFetchGetResponse(url, async (i) => writingMapById.get(i));
  }),
  http.get('/api/writingIndex/:UUID',({request}) => {
    const url = new URL(request.url);
    return mockFetchGetResponse(url, async (i) => writingIndex.find(w => w.UUID === i));
  }),
  http.get('/api/writingLink/:UUID',({request}) => {
    const url = new URL(request.url);
    return mockFetchGetResponse(url, async (i) => {
      const writing = writingMapById.get(i);
      if(!writing) return null;
      return {UUID : writing.UUID, title : writing.title};
    });
  }),
  http.get('/api/writingContent/:UUID',({request}) => {
    const url = new URL(request.url);
    return mockFetchGetResponse(url, async (i) => {
      const key = toWritingGlobKey(i);
      if(!key) return null;
      return key;
    });
  }),
  http.get('/api/comments/:UUID',({request}) => {
    const url = new URL(request.url);
    return mockFetchGetResponse(url, async (i) => {
      const writing = writingMapById.get(i);
      if(!writing) return null;
      return writing.comment.map(c => ({writer : userMapById.get(c.writer), date : c.date, content : c.content}));
    });
  }),
  
  
  
]