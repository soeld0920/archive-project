/**
 * UUID: rq002aa11bb22cc3
 * Title: React Query 실전 가이드 #2 · 뮤테이션과 옵티미스틱 업데이트
 * AuthorUUID: ad12f4b9e8c34a75
 * Type: series\n * SeriesUUID: a1b2c3d4e5f60789\n * SeriesTitle: React Query 실전 가이드
 * Date: 2025-04-28
 * View: 5950 / Great: 380
 * Tags: 프론트엔드, React Query, 뮤테이션, 옵티미스틱 업데이트
 * Category: 프론트엔드 > React Query
 * URL: /writing/rq002aa11bb22cc3
 */

import CodeBlock from "components/shared/CodeBlock";
import React from "react";

export default function Article_rq002aa11bb22cc3() {
  return (
    <article className="prose max-w-none">

      <section>
        <h2>요약</h2>
        <p>React Query 캐시/키 설계, 뮤테이션, 무한 스크롤/프리패칭 등 실전 운영 포인트를 담았습니다.789456123</p>
      </section>

      <section>
        <h2>핵심 포인트</h2>
        <ul>
          <li>일관된 쿼리 키</li>\n          <li>staleTime/cachTime 조정</li>\n          <li>명시적 무효화</li>
        </ul>
      </section>

      <section>
        <h2>예제 코드</h2>
        <CodeBlock>{`import { useQuery } from "@tanstack/react-query";
function useUser(userId: string) {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetch(/api/users/userId).then(r => r.json()),
    staleTime: 60_000,
  });
}`}</CodeBlock>
      </section>

      <section>
        <h2>체크리스트</h2>
        <ol>
          <li>키 규칙 문서화</li>\n          <li>콜렉션/디테일 분리</li>\n          <li>에러/로딩 UX</li>
        </ol>
      </section>

      <footer>
        <hr />
        <p>이 글은 학습 및 실무 정리를 위해 제작된 더미 콘텐츠입니다.</p>
      </footer>
    </article>
  );
}
