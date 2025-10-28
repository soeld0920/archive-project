import fetchWritingIndex from "backend/Writing/fetchWritingIndex"
import { seriesList } from "content/writing"
import type { Series, WritingIndex } from "types/Writing"

export default async function fetchSeries(id : string | null)  : Promise<{series : Series, writingIndexs : WritingIndex[]}>{
  if(!id) throw new Error("Not Found SeriesId")

  const foundSeries = seriesList.find(s => s.UUID === id) 

  if(!foundSeries){
    throw new Error("Not Found SeriesId")
  }

  const promises = foundSeries.WritingList.map(id => fetchWritingIndex(id))
  const writingIdxs : WritingIndex[] = await Promise.all(promises)
  return {series : foundSeries, writingIndexs : writingIdxs}
}