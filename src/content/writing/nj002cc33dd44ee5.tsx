/**
 * UUID: nj002cc33dd44ee5
 * Title: NestJS REST API 마스터 #2 · Validation & Guard, Interceptor 패턴
 * AuthorUUID: ad12f4b9e8c34a75
 * Type: series\n * SeriesUUID: b2c3d4e5f60789a1\n * SeriesTitle: NestJS REST API 마스터
 * Date: 2025-03-09
 * View: 6320 / Great: 371
 * Tags: 백엔드, NestJS, 유효성검사, 가드, 인터셉터
 * Category: 백엔드 > NestJS
 * URL: /writing/nj002cc33dd44ee5
 */

import CodeBlock from "components/shared/CodeBlock";
import React from "react";

export default function Article_nj002cc33dd44ee5() {
  return (
    <article className="prose max-w-none">

      <section>
        <h2>요약</h2>
        <p>NestJS 모듈/레이어 설계, Guard/Interceptor, Prisma Repository, E2E 테스트와 CI 통합을 단계별로 설명합니다.</p>
      </section>

      <section>
        <h2>핵심 포인트</h2>
        <ul>
          <li>도메인 모듈</li>\n          <li>Guard/Interceptor</li>\n          <li>Repository/테스트</li>
        </ul>
      </section>

      <section>
        <h2>예제 코드</h2>
        <CodeBlock>{`import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
@Module({ controllers: [UsersController], providers: [UsersService], exports: [UsersService] })
export class UsersModule {}`}</CodeBlock>
      </section>

      <section>
        <h2>체크리스트</h2>
        <ol>
          <li>DI 경계 확인</li>\n          <li>공통 규약 수립</li>\n          <li>E2E/CI 통합</li>
        </ol>
      </section>

      <footer>
        <hr />
        <p>이 글은 학습 및 실무 정리를 위해 제작된 더미 콘텐츠입니다.</p>
      </footer>
    </article>
  );
}
