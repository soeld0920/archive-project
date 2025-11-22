/*
  MSW 서버 설정 (Node.js 사이드)
  - 테스트 환경(Vitest, Jest 등)에서 API 요청을 가로채 mock 응답을 제공합니다.
  - 테스트 셋업 파일(vitest.setup.ts 등)에서 import하여 사용합니다.

  사용 예:
  import { server } from '@/mocks/server';
  
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
*/

import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);
