import type { Series, Writing, WritingIndex } from "shared/types/Writing";



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
  },
    {
      UUID: "binnergit0123456",
      title: "Git 기초 가이드 · 처음부터 실습까지",
      authorUUID: "c3d4e5f6a7b8c9d0",
      formType: "snippet",
      date: "2025-11-12",
      view: 12,
      great: 0,
      comment: [],
      tag: ["Git", "버전관리", "초보"],
      mainCategory: "백엔드",
      subCategory: "Node.js/Express",
      contentId: "binnergit0123456"
    },
    {
      UUID: "binnerhtml123456",
      title: "HTML 기초 · 웹 문서 만드는 첫걸음",
      authorUUID: "c3d4e5f6a7b8c9d0",
      formType: "snippet",
      date: "2025-11-12",
      view: 9,
      great: 0,
      comment: [],
      tag: ["HTML", "웹", "초보"],
      mainCategory: "프론트엔드",
      subCategory: "React",
      contentId: "binnerhtml123456"
    },
    {
      UUID: "binnermarkdown12",
      title: "Markdown 기초 · 문서 빠르게 작성하기",
      authorUUID: "c3d4e5f6a7b8c9d0",
      formType: "snippet",
      date: "2025-11-12",
      view: 7,
      great: 0,
      comment: [],
      tag: ["Markdown", "문서", "초보"],
      mainCategory: "프로그래밍 언어",
      subCategory: "JavaScript",
      contentId: "binnermarkdown12"
    }
];

export const writingMapById: Map<string, Writing> = new Map(writingList.map(w => [w.UUID, w]));
