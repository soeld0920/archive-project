import type { User } from "types/User";

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
  }
]

export const userMapById : Map<string, User> = new Map(userList.map(u => [u.UUID,u]))