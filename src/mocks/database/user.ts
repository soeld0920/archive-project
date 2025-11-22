import type { User } from "shared/types/User";

export const defaultUser : User = {
  UUID: "",
    email: "",
    role: "admin",
    nickname: "",
    bio: "",
    bannerImage: "src/assets/img/banner/admin_banner.jpg",

    totalWriting: -1,
    totalComment: -1,
    totalView: -1,
    totalGreat: -1,

    writingList: [],
    greatPostIds: [],
    bookmarkedPostIds: [],
    seriesIds: [],

    theme: "dark",
    id: "g34ji0oq0igprj[iqg0rm",
    password: "1894uiojfq9834fhqo93h4o"
}

export const userList : User[] = [
    {
    UUID: "ad12f4b9e8c34a75",
    email: "admin@techtext.com",
    role: "admin",
    nickname: "soeld0920",
    bio: "프론트엔드 개발과 시스템 설계에 열정적인 관리자입니다.",
    bannerImage: "src/assets/img/banner/admin_banner.jpg",

    totalWriting: 128,
    totalComment: 642,
    totalView: 48500,
    totalGreat: 3130,

    writingList: ["rq001aa11bb22cc3", "rq002aa11bb22cc3", "rq003aa11bb22cc3","nj001cc33dd44ee5","nj002cc33dd44ee5","nj003cc33dd44ee5","nj004cc33dd44ee5"],
    greatPostIds: ["rq001aa11bb22cc3", "rq002aa11bb22cc3", "rq003aa11bb22cc3","sn002dd55ee66ff7"],
    bookmarkedPostIds: ["sn001dd55ee66ff7"],
    seriesIds: ["a1b2c3d4e5f60789","b2c3d4e5f60789a1"],

    theme: "dark",
    id: "2oo4o920",
    password: "!naeding0920"
  },
  {
    UUID: "9b2e7f5c4a1d8e63",
    email: "user01@techtext.com",
    role: "user",
    nickname: "SkyFox",
    bio: "React와 TypeScript를 배우며 성장 중인 프론트엔드 유저입니다.",
    bannerImage: "src/assets/img/banner/user_banner.jpg",

    totalWriting: 12,
    totalComment: 34,
    totalView: 2450,
    totalGreat: 180,

    writingList: ["sn001dd55ee66ff7", "sn002dd55ee66ff7"],
    greatPostIds: ["rq001aa11bb22cc3"],
    bookmarkedPostIds: ["rq002aa11bb22cc3"],
    seriesIds : [],

    theme: "light",
    id: "skyfox11",
    password: "#SkyFoxA9"
  },
  {
    UUID: "c3d4e5f6a7b8c9d0",
    email: "devmaster@techtext.com",
    role: "user",
    nickname: "DevMaster",
    bio: "백엔드 아키텍처와 마이크로서비스 설계 전문가입니다.",
    bannerImage: "src/assets/img/banner/user_banner.jpg",

    totalWriting: 45,
    totalComment: 128,
    totalView: 15200,
    totalGreat: 890,

    writingList: [],
    greatPostIds: [],
    bookmarkedPostIds: [],
    seriesIds: [],

    theme: "dark",
    id: "devmaster",
    password: "@DevMaster123"
  },
  {
    UUID: "d4e5f6a7b8c9d0e1",
    email: "algoexpert@techtext.com",
    role: "user",
    nickname: "AlgoExpert",
    bio: "알고리즘 문제 해결과 최적화에 관심이 많은 개발자입니다.",
    bannerImage: "src/assets/img/banner/user_banner.jpg",

    totalWriting: 28,
    totalComment: 95,
    totalView: 8900,
    totalGreat: 520,

    writingList: [],
    greatPostIds: [],
    bookmarkedPostIds: [],
    seriesIds: [],

    theme: "light",
    id: "algoexpert",
    password: "$AlgoExpert99"
  },
  {
    UUID: "e5f6a7b8c9d0e1f2",
    email: "secureshield@techtext.com",
    role: "user",
    nickname: "SecureShield",
    bio: "보안과 암호화 기술에 전문성을 가진 개발자입니다.",
    bannerImage: "src/assets/img/banner/user_banner.jpg",

    totalWriting: 32,
    totalComment: 76,
    totalView: 11200,
    totalGreat: 680,

    writingList: [],
    greatPostIds: [],
    bookmarkedPostIds: [],
    seriesIds: [],

    theme: "dark",
    id: "secureshield",
    password: "#SecureShield88"
  },
  {
    UUID: "f6a7b8c9d0e1f2a3",
    email: "dbwizard@techtext.com",
    role: "user",
    nickname: "DBWizard",
    bio: "데이터베이스 설계와 성능 최적화를 다루는 DBA입니다.",
    bannerImage: "src/assets/img/banner/user_banner.jpg",

    totalWriting: 38,
    totalComment: 142,
    totalView: 16800,
    totalGreat: 950,

    writingList: [],
    greatPostIds: [],
    bookmarkedPostIds: [],
    seriesIds: [],

    theme: "light",
    id: "dbwizard",
    password: "@DBWizard2024"
  },
  {
    UUID: "a7b8c9d0e1f2a3b4",
    email: "gamepro@techtext.com",
    role: "user",
    nickname: "GamePro",
    bio: "게임 개발과 Unity 엔진을 활용한 프로젝트를 진행합니다.",
    bannerImage: "src/assets/img/banner/user_banner.jpg",

    totalWriting: 22,
    totalComment: 58,
    totalView: 7200,
    totalGreat: 410,

    writingList: [],
    greatPostIds: [],
    bookmarkedPostIds: [],
    seriesIds: [],

    theme: "dark",
    id: "gamepro",
    password: "$GamePro2024"
  },
  {
    UUID: "b8c9d0e1f2a3b4c5",
    email: "pythonista@techtext.com",
    role: "user",
    nickname: "Pythonista",
    bio: "Python과 데이터 과학에 열정적인 개발자입니다.",
    bannerImage: "src/assets/img/banner/user_banner.jpg",

    totalWriting: 35,
    totalComment: 89,
    totalView: 13400,
    totalGreat: 720,

    writingList: [],
    greatPostIds: [],
    bookmarkedPostIds: [],
    seriesIds: [],

    theme: "light",
    id: "pythonista",
    password: "#Pythonista99"
  },
  {
    UUID: "c9d0e1f2a3b4c5d6",
    email: "rustacean@techtext.com",
    role: "user",
    nickname: "Rustacean",
    bio: "Rust 언어와 시스템 프로그래밍을 연구하는 개발자입니다.",
    bannerImage: "src/assets/img/banner/user_banner.jpg",

    totalWriting: 18,
    totalComment: 45,
    totalView: 5800,
    totalGreat: 320,

    writingList: [],
    greatPostIds: [],
    bookmarkedPostIds: [],
    seriesIds: [],

    theme: "dark",
    id: "rustacean",
    password: "@Rustacean88"
  },
  {
    UUID: "d0e1f2a3b4c5d6e7",
    email: "fullstack@techtext.com",
    role: "user",
    nickname: "FullStackDev",
    bio: "풀스택 개발과 최신 웹 기술 트렌드를 추적합니다.",
    bannerImage: "src/assets/img/banner/user_banner.jpg",

    totalWriting: 42,
    totalComment: 156,
    totalView: 19200,
    totalGreat: 1100,

    writingList: [],
    greatPostIds: [],
    bookmarkedPostIds: [],
    seriesIds: [],

    theme: "light",
    id: "fullstackdev",
    password: "$FullStack2024"
  },
  {
    UUID: "e1f2a3b4c5d6e7f8",
    email: "typescript@techtext.com",
    role: "user",
    nickname: "TypeScriptGuru",
    bio: "TypeScript와 정적 타입 시스템을 사랑하는 개발자입니다.",
    bannerImage: "src/assets/img/banner/user_banner.jpg",

    totalWriting: 29,
    totalComment: 103,
    totalView: 9600,
    totalGreat: 580,

    writingList: [],
    greatPostIds: [],
    bookmarkedPostIds: [],
    seriesIds: [],

    theme: "dark",
    id: "tsguru",
    password: "#TypeScriptGuru"
  }
]

export const userMapById : Map<string, User> = new Map(userList.map(u => [u.UUID,u]))