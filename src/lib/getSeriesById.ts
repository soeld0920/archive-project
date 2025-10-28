import { seriesList } from "content/writing";

export function getSeriesById(UUID? : string){
  if(!UUID) return undefined;
  return seriesList.find(series => series.UUID === UUID);
}