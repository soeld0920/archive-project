export const binnerWritingIdx : number[] = [9,10,11]
export const binnerWritingUpdate : Date = new Date("2025-11-12T00:00:00Z");
export type BinnerExplanation = {
  UUID : string,
  title : string,
  description : string
}
export const binnerExplanationList : BinnerExplanation[] = [
  {
    UUID : "binnergit0123456",
    title : "Git 기초 배우기",
    description : "Git의 기본 개념과 사용법을 익혀보세요."
  },
  {
    UUID : "binnerhtml123456",
    title : "HTML 입문",
    description : "HTML 기초 문법과 개념을 학습하세요."
  },
  {
    UUID : "binnermarkdown12",
    title : "MDK 시작하기",
    description : "MDK 기본 사용법과  구조를 알아보세요."
  }
];