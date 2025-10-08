type Category = {
  text : string;
  subCategory : string[];
}

export type SearchParams = {
  mainCategory : string;
  subCategory : string;
  detail : string;
}

export const categorys: Category[] = [
  {
    text: "프로그래밍 언어",
    subCategory: [
      "Python", "C", "C++", "C#", "Java", "JavaScript", "TypeScript",
      "Go", "Rust", "Kotlin", "Swift", "PHP", "Ruby"
    ]
  },
  {
    text: "프론트엔드",
    subCategory: [
      "React", "React Router", "Vite", "Webpack", "Babel",
      "TypeScript", "Tailwind CSS", "Styled-Components",
      "Redux Toolkit", "Zustand", "Context API",
      "Axios/Fetch", "React Query", "Immer"
    ]
  },
  {
    text: "백엔드",
    subCategory: [
      "Node.js/Express", "NestJS", "Spring Boot", "Django",
      "Flask", "FastAPI", "Ruby on Rails", ".NET", "Go(Gin/Fiber)"
    ]
  },
  {
    text: "보안",
    subCategory: [
      "OWASP Top 10", "인증/인가(JWT/OAuth)", "암호화/해시",
      "HTTPS/TLS", "XSS/CSRF/SQL Injection", "취약점 진단", "로그/모니터링"
    ]
  },
  {
    text: "데이터베이스",
    subCategory: [
      "SQL 기본", "정규화", "인덱스/옵티마이저", "트랜잭션/격리수준",
      "모델링", "MySQL", "PostgreSQL", "SQLite", "MongoDB", "Redis",
      "복제/샤딩", "ORM(Prisma/TypeORM)"
    ]
  },
  {
    text: "게임 엔진",
    subCategory: ["Unity", "Unreal", "Godot", "Cocos", "Phaser"]
  },
  {
    text: "알고리즘",
    subCategory: [
      "Greedy", "DP", "탐색(DFS/BFS)", "정렬", "그래프", "트리",
      "분할정복", "이진 탐색", "백트래킹"
    ]
  }
];