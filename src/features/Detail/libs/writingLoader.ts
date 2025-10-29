import fetchSeries from "backend/Series/fetchSeries"
import fetchUser from "backend/User/fetchUser"
import { fetchWritingByParams } from "lib/getWritingByParams"
import { toWritingGlobKey, WRITING_CONTENT_MODULES } from "lib/normalizeToGlobKey"
import { lazy } from "react"
import type { User } from "types/User"
import type { Series, Writing, WritingIndex } from "types/Writing"

type WritingDetailLoderData = {
  writing : Writing
  author : User
  WritingContent : React.LazyExoticComponent<React.ComponentType<any>>
  seriesPayload? : {series : Series, writingIndexs : WritingIndex[]}
}

export default async function writingLoader(request : Request) : Promise<WritingDetailLoderData>{
  const searchParams = new URL(request.url).searchParams
  const writing = await fetchWritingByParams(searchParams);
  const authorP = await fetchUser(writing.authorUUID);
  const WritingContent = getWritingContent(writing.URL)
  if(!WritingContent) throw new Error("Not Content")
  if(writing.formType === "series"){
    const seriesP = await fetchSeries(writing.seriesUUID || null)
    const [author, series] = await Promise.all([authorP, seriesP])
    return {writing : writing, author : author, WritingContent : WritingContent , seriesPayload : {series : series.series, writingIndexs : series.writingIndexs}}
  }
  else {
    const author = await authorP
    return {writing : writing, author : author,  WritingContent : WritingContent}
  }
}


function getWritingContent(URL : string){
  const key = toWritingGlobKey(URL);
  if(!key) return null;

  const loader = WRITING_CONTENT_MODULES[key]; // () => Promise<Module>
  if (!loader) return null;

  // React.lazy 래핑
  return lazy(async () => {
    const mod = (await loader()) as { default: React.ComponentType<any> };
    return { default: mod.default };
  });
}