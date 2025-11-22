/*
  MSW 사용 및 설정 가이드

  ## 파일 구조
  
  src/mocks/
  ├── handlers.ts       - 모든 API 핸들러 정의
  ├── browser.ts        - 브라우저 환경 설정 (개발/프리뷰)
  ├── server.ts         - Node.js 환경 설정 (테스트)
  └── README.md         - 이 문서

  ## 1. 개발 환경에서 사용하기 (브라우저)

  ### 1.1 main.tsx에 초기화 코드 추가

  ```typescript
  // src/main.tsx
  import React from 'react'
  import ReactDOM from 'react-dom/client'
  import App from './App.tsx'

  // 개발 환경에서만 MSW 활성화
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser');
    await worker.start({
      onUnhandledRequest: 'warn', // 핸들되지 않은 요청 경고
    });
  }

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
  ```

  ### 1.2 public/mockServiceWorker.js 다운로드 (중요!)

  MSW는 Service Worker를 사용하므로 다음 파일을 public 폴더에 다운로드해야 합니다:

  ```bash
  # 프로젝트 루트에서 실행
  npx msw init public --save
  ```

  이 명령으로 `public/mockServiceWorker.js`와 `public/mockServiceWorker.js.map` 파일이 생성됩니다.

  ## 2. 핸들러 추가하기

  handlers.ts 에서 필요한 API 엔드포인트를 추가합니다:

  ```typescript
  import { http, HttpResponse } from 'msw';

  export const handlers = [
    http.get('/api/users', () => {
      return HttpResponse.json(
        { users: [...] },
        { status: 200 }
      );
    }),

    http.post('/api/users', async ({ request }) => {
      const data = await request.json();
      return HttpResponse.json(data, { status: 201 });
    }),

    http.delete('/api/users/:id', ({ params }) => {
      return HttpResponse.json(
        { message: 'Deleted' },
        { status: 200 }
      );
    }),
  ];
  ```

  ## 3. 테스트 환경에서 사용하기 (Node.js)

  ### 3.1 Vitest 설정 (vitest.config.ts 또는 vite.config.ts)

  ```typescript
  import { defineConfig } from 'vitest/config'

  export default defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/mocks/setup.ts'],
    },
  })
  ```

  ### 3.2 setupFiles 생성 (src/mocks/setup.ts)

  ```typescript
  import { server } from './server';

  // 모든 테스트 실행 전에 한번 listener 시작
  beforeAll(() => server.listen());

  // 각 테스트 후 핸들러 초기화 (이전 테스트 간섭 방지)
  afterEach(() => server.resetHandlers());

  // 모든 테스트 완료 후 listener 종료
  afterAll(() => server.close());
  ```

  ## 4. 동적으로 핸들러 오버라이드하기

  테스트나 개발 중 특정 요청에 대해 다른 응답을 하고 싶을 때:

  ```typescript
  // 브라우저 환경
  import { worker } from '@/mocks/browser';

  worker.use(
    http.get('/api/users', () => {
      return HttpResponse.json({ error: 'Not found' }, { status: 404 });
    })
  );
  ```

  ```typescript
  // 테스트 환경
  import { server } from '@/mocks/server';

  it('should handle error', () => {
    server.use(
      http.get('/api/users', () => {
        return HttpResponse.json({ error: 'Error' }, { status: 500 });
      })
    );
    
    // 테스트 코드...
  });
  ```

  ## 5. 자주 사용되는 핸들러 패턴

  ### GET 요청
  ```typescript
  http.get('/api/items', () => {
    return HttpResponse.json([...]);
  });
  ```

  ### POST 요청 (본문 파싱)
  ```typescript
  http.post('/api/items', async ({ request }) => {
    const data = await request.json();
    return HttpResponse.json({ ...data, id: 1 });
  });
  ```

  ### 경로 매개변수
  ```typescript
  http.get('/api/items/:id', ({ params }) => {
    return HttpResponse.json({ id: params.id, name: 'Item' });
  });
  ```

  ### 쿼리 매개변수
  ```typescript
  http.get('/api/items', ({ request }) => {
    const url = new URL(request.url);
    const sort = url.searchParams.get('sort');
    return HttpResponse.json([...]);
  });
  ```

  ### 상태 코드 설정
  ```typescript
  HttpResponse.json(data, { status: 201 });
  HttpResponse.json(data, { status: 404 });
  HttpResponse.text('Not found', { status: 404 });
  ```

  ## 6. 주의사항

  - MSW는 네트워크 요청을 가로채므로, 실제 API 호출이 일어나지 않습니다.
  - 프로덕션 빌드에서는 MSW가 비활성화되어야 합니다 (보통 `import.meta.env.DEV` 체크로 처리).
  - Service Worker는 HTTPS 또는 localhost에서만 작동합니다.
  - `public/mockServiceWorker.js`가 없으면 작동하지 않습니다!

  ## 7. 문제 해결

  ### "Service Worker not found" 에러
  → `npx msw init public --save` 실행 필요

  ### 핸들러가 반응하지 않음
  → browser 콘솔에서 MSW 로그 확인
  → handlers.ts의 경로/메서드가 정확한지 확인

  ### 개발 중 변경사항이 반영되지 않음
  → 브라우저 캐시 비우기 (Ctrl+Shift+Delete)
  → 개발 서버 재시작

  ## 참고 링크
  - MSW 공식 문서: https://mswjs.io/
  - MSW GitHub: https://github.com/mswjs/msw
*/
