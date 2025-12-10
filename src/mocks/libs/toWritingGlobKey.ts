/**
 * 글 콘텐츠 모듈 매핑
 * - import.meta.glob에 등록된 모듈 키들 중에서 검색합니다.
 * - content 폴더와 (테스트/모킹용) mocks/database 폴더를 모두 포함하도록 패턴 확장
 */
export const WRITING_CONTENT_MODULES = import.meta.glob(
  [
    "/src/content/**/*.{tsx,mdx,md}",
    "/src/mocks/database/**/*.{tsx,mdx,md}",
  ],
  { eager: false }
);

/**
 * toWritingGlobKey
 * - 입력값(파일 경로, 슬러그 등)을 받아서 
 *  import.meta.glob에서 사용되는 모듈 키(예: '/src/content/writing/foo.mdx')를 찾아 반환합니다.
 * - 반환값: 매칭되는 모듈 키 문자열 또는 매칭 실패 시 null
 *
 * 동작 요약:
 * 1. 입력을 정규화 (공백/쿼리/해시 제거)
 * 2. 이미 '/src/'로 시작하면 바로 존재 여부 확인
 * 3. 상대 경로 또는 슬러그를 '/src/content' 기준으로 보정하여 후보들을 생성
 * 4. 확장자(.tsx, .mdx, .md) 및 인덱스('/index.tsx' 등) 후보를 순서대로 검사
 */
export function toWritingGlobKey(input: string): string | null {
  if (!input) return null;

  // 1) 기본 정규화: 공백, 쿼리, 해시 제거
  let p = input.trim();
  p = p.split(/[?#]/)[0];

  // 2) 이미 절대 import 키인 경우 (예: '/src/content/...')
  if (p.startsWith("/src/")) {
    if (Object.prototype.hasOwnProperty.call(WRITING_CONTENT_MODULES, p)) return p;
    return null;
  }

  // 3) 슬래시를 보정하여 '/src/mocks/database' 밑으로 매핑
  // 입력 예시: 'writing/foo', '/writing/foo', 'foo.mdx', '/content/foo'
  const ensureLeadingSlash = (s: string) => (s.startsWith("/") ? s : `/${s}`);

  let candidateBase = p;
  // 사용자가 '/content/...' 형태로 적었다면 '/src'를 붙임
  if (candidateBase.startsWith('/mocks/')) {
    candidateBase = `/src${candidateBase}`;
  } else if(candidateBase.startsWith('/database')){
    candidateBase = `/src/mocks${ensureLeadingSlash(candidateBase.replace(/^\//, ''))}`
  } else if (candidateBase.startsWith('/writing/') || candidateBase.startsWith('/writing')) {
    // 흔한 슬러그 형태를 mocks 하위로 맵핑
    candidateBase = `/src/mocks/database${ensureLeadingSlash(candidateBase.replace(/^\//, ''))}`;
  } else {
    // 일반적인 상대경로/슬러그: content 하위로 간주
    candidateBase = `/src/mocks/database/writing${ensureLeadingSlash(candidateBase)}`;
  }

  // 4) 후보 확장자/인덱스 목록
  const exts = ['.tsx', '.mdx', '.md'];
  const indexCandidates = exts.map(e => `/index${e}`);

  const candidates: string[] = [];

  // if candidateBase already has an extension, check it first
  if (/\.[a-z0-9]+$/i.test(candidateBase)) {
    candidates.push(candidateBase);
  } else {
    // base itself (파일명 없는 경우)도 먼저 검사
    candidates.push(candidateBase);
    for (const e of exts) candidates.push(candidateBase + e);
    for (const ic of indexCandidates) candidates.push(candidateBase + ic);
  }

  for (const c of candidates) {
    if (Object.prototype.hasOwnProperty.call(WRITING_CONTENT_MODULES, c)) return c;
  }

  return null;
}