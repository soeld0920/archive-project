import type { Series } from "shared/types/Writing";

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

export const seriesMapById: Map<string, Series> = new Map();
seriesList.forEach(s => {
  seriesMapById.set(s.UUID, s);
});