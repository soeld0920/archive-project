export const WRITING_CONTENT_MODULES = import.meta.glob(
  "/src/content/**/*.tsx",
  { eager: false } // lazy 로드
);

export function toWritingGlobKey(input: string): string | null {
  // 이미 절대경로형이면 그대로 사용
  if (input.startsWith("/src/")) return input;

  // 슬래시 누락/확장자 누락 등을 보정하는 예시
  const withPrefix = `/src/content${input}`;
  if (WRITING_CONTENT_MODULES[withPrefix]) return withPrefix;

  // 확장자 후보 시도
  const candidates = [".tsx", ".mdx", "/index.tsx", "/index.mdx"].map(
    (ext) => withPrefix.endsWith(ext) ? withPrefix : withPrefix + ext
  );
  for (const c of candidates) {
    if (WRITING_CONTENT_MODULES[c]) return c;
  }

  return null;
}