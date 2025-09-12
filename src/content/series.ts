import type { Series } from "types/PageInfo";
import { CSpage01 } from "./page";

export const codingStart : Series = {
  id : "CS",
  category : "Basic",
  title : "처음부터 시작하는 코딩",
  pages : [CSpage01]
}

export const seriesMap : Map<string, Series> = new Map;
seriesMap.set("CS", codingStart);