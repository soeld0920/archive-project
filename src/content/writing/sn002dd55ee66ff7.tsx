/**
 * UUID: sn002dd55ee66ff7
 * Title: 그래프 탐색 BFS 한 방에 정리: 큐 패턴, 방문 체크, 레벨 처리
 * AuthorUUID: 9b2e7f5c4a1d8e63
 * Type: snippet
 * Date: 2025-01-17
 * View: 4920 / Great: 301
 * Tags: 알고리즘, 탐색(DFS/BFS), 그래프, BFS
 * Category: 알고리즘 > 탐색(DFS/BFS)
 * URL: /writing/sn002dd55ee66ff7
 */

import CodeBlock from "components/shared/CodeBlock";
import React from "react";

export default function Article_sn002dd55ee66ff7() {
  return (
    <article className="prose max-w-none">

      <section>
        <h2>요약</h2>
        <p>BFS의 큐·방문·레벨 처리 패턴으로 최단거리 탐색을 구현하는 실전 가이드.</p>
      </section>

      <section>
        <h2>핵심 포인트</h2>
        <ul>
          <li>큐/방문 분리</li>\n          <li>레벨 단위 확장</li>\n          <li>인접 구조 선택</li>
        </ul>
      </section>

      <section>
        <h2>예제 코드</h2>
        <CodeBlock>{`function bfs(start, graph) {
  const q = [start];
  const dist = { [start]: 0 };
  while (q.length) {
    const cur = q.shift();
    for (const nxt of graph[cur] || []) {
      if (dist[nxt] == null) {
        dist[nxt] = dist[cur] + 1;
        q.push(nxt);
      }
    }
  }
  return dist;
}`}</CodeBlock>
      </section>

      <section>
        <h2>체크리스트</h2>
        <ol>
          <li>초기화 확인</li>\n          <li>경계 조건 처리</li>\n          <li>복잡도 점검</li>
        </ol>
      </section>

      <footer>
        <hr />
        <p>이 글은 학습 및 실무 정리를 위해 제작된 더미 콘텐츠입니다.</p>
      </footer>
    </article>
  );
}
