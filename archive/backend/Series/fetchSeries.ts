// DB에서 id에 해당하는 시리즈 정보를 가져오는 함수
// TODO : 서버/DB의 영역으로 변경 필요. 

import fetchWritingIndex from "backend/Writing/fetchWritingIndex"
import { seriesList } from "mocks/database/writing"
import type { Series, WritingIndex } from "shared/types/Writing"

export default async function fetchSeries(id : string | null)  : Promise<{series : Series, writingIndexs : WritingIndex[]}>{
  if(!id) throw new Error("Not Found SeriesId")

  const foundSeries = seriesList.find(s => s.UUID === id) 

  if(!foundSeries){
    throw new Error("Not Found SeriesId")
  }

  const promises = foundSeries.WritingList.map(id => fetchWritingIndex(id))
  const writingIdxs : WritingIndex[] = await Promise.all(promises)

  //series : 시리즈 정보, writingIndexs : 시리즈에 속한 글들의 인덱스 정보
  return {series : foundSeries, writingIndexs : writingIdxs}
}