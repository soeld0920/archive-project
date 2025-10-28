/**
 * UUID: sn001dd55ee66ff7
 * Title: Redis로 읽기 성능 3배 올리기: TTL, 해시 구조, 핫 키 전략
 * AuthorUUID: 9b2e7f5c4a1d8e63
 * Type: snippet
 * Date: 2024-12-10
 * View: 7140 / Great: 512
 * Tags: 데이터베이스, Redis, 성능, 캐싱
 * Category: 데이터베이스 > Redis
 * URL: /writing/sn001dd55ee66ff7
 */

import CodeBlock from "components/shared/CodeBlock";
import React from "react";

export default function Article_sn001dd55ee66ff7() {
  return (
    <article className="prose max-w-none">

      <section>
        <h2>요약</h2>
        <p>읽기 지향 트래픽에서 Redis 캐시 계층을 구성하고 TTL, 자료구조, 핫 키 회피 전략을 정리했습니다.</p>
      </section>

      <section>
        <h2>핵심 포인트</h2>
        <ul>
          <li>키 네이밍으로 핫 키 분산</li>\n          <li>TTL/슬라이딩 만료</li>\n          <li>백필/콜드 스타트</li>
        </ul>
      </section>

      <section>
        <h2>예제 코드</h2>
        <CodeBlock>{`import Redis from "ioredis";
const redis = new Redis();
export async function getCachedUser(id: string) {
  const key = user:id;
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);
  const fresh = await db.user.findById(id);
  await redis.set(key, JSON.stringify(fresh), "EX", 300);
  return fresh;
}`}</CodeBlock>
      </section>

      <section>
        <h2>체크리스트</h2>
        <ol>
          <li>미스율 모니터링</li>\n          <li>쓰기 후 무효화 점검</li>\n          <li>메모리 알람</li>
        </ol>
      </section>

      <footer>
        <hr />
        <p>이 글은 학습 및 실무 정리를 위해 제작된 더미 콘텐츠입니다.</p>
      </footer>
    </article>
  );
}
