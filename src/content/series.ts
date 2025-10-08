import type { Series } from "types/PageInfo";
import { asciicode, CSpage01, CSpage02, CSpage03, CSpage04, CSpage05, CSpage06, CSpage07 } from "./page";

export const codingStart : Series = {
  id : "CS",
  category : "Basic",
  title : "처음부터 시작하는 코딩",
  pages : [CSpage01,CSpage02,CSpage03,CSpage04,CSpage05,CSpage06,CSpage07]
}

export const materials : Series = {
  id: "MT",
  category : "Etc",
  title : "여러 자료를 모와봤어요",
  pages : [asciicode]
}

export const html : Series = {
  id:"HTML",
  category : "Frontend",
  title : "프론트엔드의 기초는 html",
  pages : []
}

export const seriesMap : Map<string, Series> = new Map;
seriesMap.set("CS", codingStart);
seriesMap.set("MT", materials);
seriesMap.set("HTML", html);