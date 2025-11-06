import type { Series, Writing, WritingIndex } from "types/Writing";

export const seriesList: Series[] = [
  {
    UUID: "a1b2c3d4e5f60789",
    title : "React Query 실전 가이드",
    WritingList: ["rq001aa11bb22cc3", "rq002aa11bb22cc3", "rq003aa11bb22cc3"],
    view: 18350,
    tag: ["프론트엔드", "React Query", "캐싱", "실전"],
    seriesType: "single",
    mainCategory: "프론트엔드",
    subCategory: "React Query"
  },
  {
    UUID: "b2c3d4e5f60789a1",
    title : "NestJS로 REST API 구축",
    WritingList: ["nj001cc33dd44ee5", "nj002cc33dd44ee5", "nj003cc33dd44ee5", "nj004cc33dd44ee5"],
    view: 25120,
    tag: ["백엔드", "NestJS", "REST API", "테스팅"],
    seriesType: "single",
    mainCategory: "백엔드",
    subCategory: "NestJS"
  }
];

// ===== Writings (본문 데이터) =====
export const writingList: Writing[] = [
  // --- Series A: React Query 실전 가이드 (3편) ---
  {
    UUID: "rq001aa11bb22cc3",
    title: "React Query 실전 가이드 #1 · 캐시 전략과 쿼리 키 설계",
    authorUUID: "ad12f4b9e8c34a75",
    formType: "series",
    seriesUUID: "a1b2c3d4e5f60789",
    date: "2025-04-21",
    view: 6350,
    great: 420,
    comment: [
      { writer: "9b2e7f5c4a1d8e63", date: "2025-04-22", content: "쿼리 키 설계 팁 유용합니다!" }
    ],
    tag: ["프론트엔드", "React Query", "캐싱", "키 설계"],
    mainCategory: "프론트엔드",
    subCategory: "React Query",
    contentId: "rq001aa11bb22cc3"
  },
  {
    UUID: "rq002aa11bb22cc3",
    title: "React Query 실전 가이드 #2 · 뮤테이션과 옵티미스틱 업데이트",
    authorUUID: "ad12f4b9e8c34a75",
    formType: "series",
    seriesUUID: "a1b2c3d4e5f60789",
    date: "2025-04-28",
    view: 5950,
    great: 380,
    comment: [
      { writer: "9b2e7f5c4a1d8e63", date: "2025-04-29", content: "옵티미스틱 업데이트 패턴 정리 굿!" },
      { writer: "ad12f4b9e8c34a75", date: "2025-04-29", content: "예제 코드는 깃에 올려둘게요." }
    ],
    tag: ["프론트엔드", "React Query", "뮤테이션", "옵티미스틱 업데이트"],
    mainCategory: "프론트엔드",
    subCategory: "React Query",
    contentId: "rq002aa11bb22cc3"
  },
  {
    UUID: "rq003aa11bb22cc3",
    title: "React Query 실전 가이드 #3 · 무한 스크롤과 프리패칭",
    authorUUID: "ad12f4b9e8c34a75",
    formType: "series",
    seriesUUID: "a1b2c3d4e5f60789",
    date: "2025-05-05",
    view: 6050,
    great: 392,
    comment: [],
    tag: ["프론트엔드", "React Query", "무한스크롤", "프리패칭"],
    mainCategory: "프론트엔드",
    subCategory: "React Query",
    contentId: "rq003aa11bb22cc3"
  },

  // --- Snippets (단편 2편) ---
  {
    UUID: "sn001dd55ee66ff7",
    title: "Redis로 읽기 성능 3배 올리기: TTL, 해시 구조, 핫 키 전략",
    authorUUID: "9b2e7f5c4a1d8e63",
    formType: "snippet",
    date: "2024-12-10",
    view: 7140,
    great: 512,
    comment: [
      { writer: "ad12f4b9e8c34a75", date: "2024-12-11", content: "운영 적용 시 주의점도 덧붙이면 좋겠어요." }
    ],
    tag: ["데이터베이스", "Redis", "성능", "캐싱"],
    mainCategory: "데이터베이스",
    subCategory: "Redis",
    contentId: "sn001dd55ee66ff7"
  },
  {
    UUID: "sn002dd55ee66ff7",
    title: "그래프 탐색 BFS 한 방에 정리: 큐 패턴, 방문 체크, 레벨 처리",
    authorUUID: "9b2e7f5c4a1d8e63",
    formType: "snippet",
    date: "2025-01-17",
    view: 4920,
    great: 301,
    comment: [],
    tag: ["알고리즘", "탐색(DFS/BFS)", "그래프", "BFS"],
    mainCategory: "알고리즘",
    subCategory: "탐색(DFS/BFS)",
    contentId: "sn002dd55ee66ff7"
  },

  // --- Series B: NestJS로 REST API 구축 (4편) ---
  {
    UUID: "nj001cc33dd44ee5",
    title: "NestJS REST API 마스터 #1 · 프로젝트 구조와 모듈 설계",
    authorUUID: "ad12f4b9e8c34a75",
    formType: "series",
    seriesUUID: "b2c3d4e5f60789a1",
    date: "2025-03-02",
    view: 6210,
    great: 355,
    comment: [
      { writer: "9b2e7f5c4a1d8e63", date: "2025-03-03", content: "모듈 분리 기준이 깔끔하네요." }
    ],
    tag: ["백엔드", "NestJS", "아키텍처", "모듈"],
    mainCategory: "백엔드",
    subCategory: "NestJS",
    contentId: "nj001cc33dd44ee5"
  },
  {
    UUID: "nj002cc33dd44ee5",
    title: "NestJS REST API 마스터 #2 · Validation & Guard, Interceptor 패턴",
    authorUUID: "ad12f4b9e8c34a75",
    formType: "series",
    seriesUUID: "b2c3d4e5f60789a1",
    date: "2025-03-09",
    view: 6320,
    great: 371,
    comment: [],
    tag: ["백엔드", "NestJS", "유효성검사", "가드", "인터셉터"],
    mainCategory: "백엔드",
    subCategory: "NestJS",
    contentId: "nj002cc33dd44ee5"
  },
  {
    UUID: "nj003cc33dd44ee5",
    title: "NestJS REST API 마스터 #3 · Prisma로 Repository 레이어 정복",
    authorUUID: "ad12f4b9e8c34a75",
    formType: "series",
    seriesUUID: "b2c3d4e5f60789a1",
    date: "2025-03-16",
    view: 6120,
    great: 340,
    comment: [
      { writer: "ad12f4b9e8c34a75", date: "2025-03-17", content: "트랜잭션 샘플 코드 추가했습니다." }
    ],
    tag: ["백엔드", "NestJS", "Prisma", "Repository"],
    mainCategory: "백엔드",
    subCategory: "NestJS",
    contentId: "nj003cc33dd44ee5"
  },
  {
    UUID: "nj004cc33dd44ee5",
    title: "NestJS REST API 마스터 #4 · E2E 테스트와 GitHub Actions CI",
    authorUUID: "ad12f4b9e8c34a75",
    formType: "series",
    seriesUUID: "b2c3d4e5f60789a1",
    date: "2025-03-23",
    view: 6470,
    great: 410,
    comment: [],
    tag: ["백엔드", "NestJS", "테스트", "CI/CD"],
    mainCategory: "백엔드",
    subCategory: "NestJS",
    contentId: "nj004cc33dd44ee5"
  }
];

// ===== WritingIndex (목록/카드용) =====
export const writingIndex: WritingIndex[] = [
  // --- Series A: 3편 ---
  {
    UUID: "rq001aa11bb22cc3",
    title: "React Query 실전 가이드 #1 · 캐시 전략과 쿼리 키 설계",
    authorUUID: "ad12f4b9e8c34a75",
    authorName: "TechMaster",
    formType: "series",
    seriesUUID: "a1b2c3d4e5f60789",
    seriesTitle: "React Query 실전 가이드",
    date: "2025-04-21",
    view: 6350,
    great: 420,
    commentCount: 1,
    tag: ["프론트엔드", "React Query", "캐싱", "키 설계"],
    mainCategory: "프론트엔드",
    subCategory: "React Query",
    image: "src/assets/img/cover/react-query-1.jpg",
    content:
      "React Query에서 캐시 전략과 쿼리 키를 어떻게 설계할지 실전 기준으로 정리합니다. API 자원 단위, 파라미터 조합, 의존성 키 설계 원칙을 예시 코드와 함께 보여주며, 캐시 무효화와 재검증 타이밍을 운영 관점에서 다룹니다."
  },
  {
    UUID: "rq002aa11bb22cc3",
    title: "React Query 실전 가이드 #2 · 뮤테이션과 옵티미스틱 업데이트",
    authorUUID: "ad12f4b9e8c34a75",
    authorName: "TechMaster",
    formType: "series",
    seriesUUID: "a1b2c3d4e5f60789",
    seriesTitle: "React Query 실전 가이드",
    date: "2025-04-28",
    view: 5950,
    great: 380,
    commentCount: 2,
    tag: ["프론트엔드", "React Query", "뮤테이션", "옵티미스틱 업데이트"],
    mainCategory: "프론트엔드",
    subCategory: "React Query",
    image: "src/assets/img/cover/react-query-2.jpg",
    content:
      "뮤테이션 요청을 다루는 기본 패턴과 옵티미스틱 업데이트 구현 요령을 소개합니다. 낙관적 반영 시 동기화 충돌을 줄이는 키 포인트, 실패 롤백과 재시도 전략을 코드로 보여주고, onMutate/onError/onSettled 훅 활용 사례를 덧붙입니다."
  },
  {
    UUID: "rq003aa11bb22cc3",
    title: "React Query 실전 가이드 #3 · 무한 스크롤과 프리패칭",
    authorUUID: "ad12f4b9e8c34a75",
    authorName: "TechMaster",
    formType: "series",
    seriesUUID: "a1b2c3d4e5f60789",
    seriesTitle: "React Query 실전 가이드",
    date: "2025-05-05",
    view: 6050,
    great: 392,
    commentCount: 0,
    tag: ["프론트엔드", "React Query", "무한스크롤", "프리패칭"],
    mainCategory: "프론트엔드",
    subCategory: "React Query",
    image: "src/assets/img/cover/react-query-3.jpg",
    content:
      "useInfiniteQuery로 구현하는 무한 스크롤의 핵심 개념, 페이지 키 관리, 스크롤 이벤트 최적화, 프리패칭 전략을 정리합니다. 스켈레톤/플레이스홀더 처리와 함께 UX를 향상시키는 로딩 상태 설계 포인트를 체크리스트로 제공합니다."
  },

  // --- Snippets 2편 ---
  {
    UUID: "sn001dd55ee66ff7",
    title: "Redis로 읽기 성능 3배 올리기: TTL, 해시 구조, 핫 키 전략",
    authorUUID: "9b2e7f5c4a1d8e63",
    authorName: "SkyFox",
    formType: "snippet",
    date: "2024-12-10",
    view: 7140,
    great: 512,
    commentCount: 1,
    tag: ["데이터베이스", "Redis", "성능", "캐싱"],
    mainCategory: "데이터베이스",
    subCategory: "Redis",
    image: "src/assets/img/cover/redis-1.jpg",
    content:
      "읽기 집약 트래픽에서 Redis를 적용해 성능을 끌어올리는 방법을 공유합니다. TTL 정책과 데이터 구조(해시/리스트), 핫 키를 분산하는 키 네이밍, 미스율을 줄이는 프리로드 전략, 백필/콜드 스타트 대응을 운영 사례와 함께 정리했습니다."
  },
  {
    UUID: "sn002dd55ee66ff7",
    title: "그래프 탐색 BFS 한 방에 정리: 큐 패턴, 방문 체크, 레벨 처리",
    authorUUID: "9b2e7f5c4a1d8e63",
    authorName: "SkyFox",
    formType: "snippet",
    date: "2025-01-17",
    view: 4920,
    great: 301,
    commentCount: 0,
    tag: ["알고리즘", "탐색(DFS/BFS)", "그래프", "BFS"],
    mainCategory: "알고리즘",
    subCategory: "탐색(DFS/BFS)",
    image: "src/assets/img/cover/bfs-1.jpg",
    content:
      "BFS의 기본 원리와 큐 기반 패턴, 방문 배열 관리, 레벨 단위 확장을 실제 예제로 살펴봅니다. 최단거리 탐색, 다중 시작점 처리, 장애물 맵에서의 경로 탐색 등 잦은 패턴과 함정 포인트를 빠르게 점검할 수 있게 요약했습니다."
  },

  // --- Series B: 4편 ---
  {
    UUID: "nj001cc33dd44ee5",
    title: "NestJS REST API 마스터 #1 · 프로젝트 구조와 모듈 설계",
    authorUUID: "ad12f4b9e8c34a75",
    authorName: "TechMaster",
    formType: "series",
    seriesUUID: "b2c3d4e5f60789a1",
    seriesTitle: "NestJS REST API 마스터",
    date: "2025-03-02",
    view: 6210,
    great: 355,
    commentCount: 1,
    tag: ["백엔드", "NestJS", "아키텍처", "모듈"],
    mainCategory: "백엔드",
    subCategory: "NestJS",
    image: "src/assets/img/cover/nestjs-1.jpg",
    content:
      "NestJS로 REST API를 설계할 때 모듈/레이어 구조, 의존성 주입, 공용 유틸과 예외 필터를 어디에 배치할지 정리했습니다. 팀 협업에서 유지보수성과 테스트 용이성을 높이는 구조적 기준을 체크리스트와 함께 제시합니다."
  },
  {
    UUID: "nj002cc33dd44ee5",
    title: "NestJS REST API 마스터 #2 · Validation & Guard, Interceptor 패턴",
    authorUUID: "ad12f4b9e8c34a75",
    authorName: "TechMaster",
    formType: "series",
    seriesUUID: "b2c3d4e5f60789a1",
    seriesTitle: "NestJS REST API 마스터",
    date: "2025-03-09",
    view: 6320,
    great: 371,
    commentCount: 0,
    tag: ["백엔드", "NestJS", "유효성검사", "가드", "인터셉터"],
    mainCategory: "백엔드",
    subCategory: "NestJS",
    image: "src/assets/img/cover/nestjs-2.jpg",
    content:
      "DTO 기반 유효성 검증과 Guard, Interceptor를 통해 인증·인가, 로깅, 응답 매핑을 일관성 있게 적용하는 패턴을 다룹니다. 전역/로컬 스코프 운영 팁과 책임 분리를 위한 구성 예시를 코드와 함께 설명합니다."
  },
  {
    UUID: "nj003cc33dd44ee5",
    title: "NestJS REST API 마스터 #3 · Prisma로 Repository 레이어 정복",
    authorUUID: "ad12f4b9e8c34a75",
    authorName: "TechMaster",
    formType: "series",
    seriesUUID: "b2c3d4e5f60789a1",
    seriesTitle: "NestJS REST API 마스터",
    date: "2025-03-16",
    view: 6120,
    great: 340,
    commentCount: 1,
    tag: ["백엔드", "NestJS", "Prisma", "Repository"],
    mainCategory: "백엔드",
    subCategory: "NestJS",
    image: "src/assets/img/cover/nestjs-3.jpg",
    content:
      "Repository 레이어에서 Prisma를 사용할 때의 트랜잭션, 데이터 맵핑, 에러 처리 패턴을 정리합니다. 서비스/레포지토리 경계, 커스텀 예외, 공통 쿼리 유틸을 통해 테스트 용이성과 유지보수성을 높이는 방법을 제시합니다."
  },
  {
    UUID: "nj004cc33dd44ee5",
    title: "NestJS REST API 마스터 #4 · E2E 테스트와 GitHub Actions CI",
    authorUUID: "ad12f4b9e8c34a75",
    authorName: "TechMaster",
    formType: "series",
    seriesUUID: "b2c3d4e5f60789a1",
    seriesTitle: "NestJS REST API 마스터",
    date: "2025-03-23",
    view: 6470,
    great: 410,
    commentCount: 0,
    tag: ["백엔드", "NestJS", "테스트", "CI/CD"],
    mainCategory: "백엔드",
    subCategory: "NestJS",
    image: "src/assets/img/cover/nestjs-4.jpg",
    content:
      "E2E 테스트 구성과 테스트 컨테이너 전략, GitHub Actions를 이용한 CI 파이프라인 예시를 제공합니다. 시드 데이터, 환경 분리, 캐시 활용 등 배포 전 품질을 담보하기 위한 체크 항목을 단계별로 나눠 정리했습니다."
  }
];

export const writingMapById: Map<string, Writing> = new Map(writingList.map(w => [w.UUID, w]));