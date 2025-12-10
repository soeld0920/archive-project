/*
  MSW 핸들러 정의
  - 모든 API 요청 mock을 이곳에 정의합니다.
  - http.get, http.post 등의 메서드로 라우트별 응답을 설정합니다.
*/import { gets } from './handlers/gets';
import { puts } from './handlers/puts';

export const handlers = [
  ...gets,
  ...puts
];
