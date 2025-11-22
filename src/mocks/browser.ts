/*
  MSW 브라우저 설정 (클라이언트 사이드)
  - 개발 중 브라우저에서 API 요청을 가로채 mock 응답을 제공합니다.
  - `src/main.tsx`에서 동적으로 import 및 startServer()로 활성화합니다.
*/

import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);
