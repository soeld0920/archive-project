import { differenceInDays, parse, startOfToday } from "date-fns";
import type { Writing, WritingIndex } from "types/Writing";

type ScoreWeight = {
  viewWeight? : number;
  greatWeight? : number;
  dateWeight? : number;
}

const viewStand = 6500
const greatStand = 450

export default function sortWritingByScore<T extends { view: number; great: number; date: string }>(writings : T[], {viewWeight = 1, greatWeight = 1, dateWeight = 1} : ScoreWeight) : T[]{
  const today = startOfToday();
  const writingIdxAndWeight : number[][] = writings.map((w,i) => {
    const weight : number = 
      Math.log10(w.view + 1) / Math.log10(viewStand) * viewWeight +
      w.great / greatStand * greatWeight +
      Math.exp(-differenceInDays(today, parse(w.date,"yyyy-MM-dd", new Date()))/ 7) * dateWeight
    return [i,weight]
  })

  writingIdxAndWeight.sort((a,b) => b[1] - a[1])

  return writingIdxAndWeight.map(([i]) => writings[i]);
}