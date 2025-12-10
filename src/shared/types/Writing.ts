import type { User } from "./User";

export type FORM_TYPE = "snippet" | "series"

export type WritingIndex = {
  UUID : string;
  title : string;
  authorUUID : string; //링크용
  authorName : string; //표시용
  formType : FORM_TYPE;
  seriesUUID? : string; 
  seriesTitle? :string;
  date : string;
  view : number;
  great : number;
  commentCount : number;
  tag : string[];
  mainCategory : MainCategory;
  subCategory : SubCategory;
  image? :string;
  content : string; //앞에 보일 약 150자의 내용만
}

export type Writing = {
  UUID : string;
  title : string;
  authorUUID : string; //id

  formType : FORM_TYPE;
  seriesUUID? : string; //id

  date : string;
  view : number;
  great : number;

  comment : Comment[];
  tag : string[];

  mainCategory : MainCategory;
  subCategory : SubCategory;
  
  contentId : string;
}

export type Comment = {
  writer : string;
  date : string;
  content : string;
}

export type CommentRes = {
  writer : User;
  date : string;
  content : string;
}

export type Series = {
  UUID : string;
  title : string;
  WritingList : string[]; //UUID
  view : number;
  tag : string[];

  seriesType : "single" | "composite"; // single이면 category 존재
  mainCategory? : string;
  subCategory? : string;
}

export type MainCategory =
  | "프로그래밍 언어"
  | "프론트엔드"
  | "백엔드"
  | "보안"
  | "데이터베이스"
  | "게임 엔진"
  | "알고리즘";

export type SubCategory =
  // 프로그래밍 언어
  | "Python" | "C" | "C++" | "C#" | "Java" | "JavaScript" | "TypeScript"
  | "Go" | "Rust" | "Kotlin" | "Swift" | "PHP" | "Ruby"
  // 프론트엔드
  | "React" | "React Router" | "Vite" | "Webpack" | "Babel"
  | "Tailwind CSS" | "Styled-Components"
  | "Redux Toolkit" | "Zustand" | "Context API"
  | "Axios/Fetch" | "React Query" | "Immer"
  // 백엔드
  | "Node.js/Express" | "NestJS" | "Spring Boot" | "Django"
  | "Flask" | "FastAPI" | "Ruby on Rails" | ".NET" | "Go(Gin/Fiber)"
  // 보안
  | "OWASP Top 10" | "인증/인가(JWT/OAuth)" | "암호화/해시"
  | "HTTPS/TLS" | "XSS/CSRF/SQL Injection" | "취약점 진단" | "로그/모니터링"
  // 데이터베이스
  | "SQL 기본" | "정규화" | "인덱스/옵티마이저" | "트랜잭션/격리수준"
  | "모델링" | "MySQL" | "PostgreSQL" | "SQLite" | "MongoDB" | "Redis"
  | "복제/샤딩" | "ORM(Prisma/TypeORM)"
  // 게임 엔진
  | "Unity" | "Unreal" | "Godot" | "Cocos" | "Phaser"
  // 알고리즘
  | "Greedy" | "DP" | "탐색(DFS/BFS)" | "정렬" | "그래프" | "트리"
  | "분할정복" | "이진 탐색" | "백트래킹";