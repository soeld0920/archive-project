/**
 * archive-project - ESLint 구성 파일
 *
 * 목적:
 * - 프로젝트 전반의 코드 스타일 및 오류를 잡아내기 위한 기본 ESLint 설정을 담습니다.
 *
 * 빠른 사용법:
 * 1) 의존성 설치 (예시):
 *    npm install --save-dev eslint @eslint/js globals eslint-plugin-react-hooks eslint-plugin-react-refresh typescript-eslint
 *
 * 2) 로컬에서 검사 실행:
 *    npx eslint .
 *
 * 주의:
 * - 실제 사용 시에는 설치하는 패키지 이름과 버전을 프로젝트 요구사항에 맞게 조정하세요.
 * - 더 정교한 TypeScript/React 설정이 필요하면 @typescript-eslint/parser, @typescript-eslint/eslint-plugin 등 추가 구성이 필요합니다.
 */

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
])
