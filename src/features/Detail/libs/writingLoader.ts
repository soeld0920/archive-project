import fetchSeries from "backend/Series/fetchSeries"
import fetchUser from "backend/User/fetchUser"
import { fetchWritingByParams } from "shared/lib/utils/getWritingByParams"
import { lazy } from "react"
import type { User } from "shared/types/User"
import type { Series, Writing, WritingIndex } from "shared/types/Writing"

type WritingDetailLoderData = {
  writing : Writing
  author : User
  WritingContent : React.LazyExoticComponent<React.ComponentType<any>>
  commentContent : {user : User, content : string, date : string}[]
  seriesPayload? : {series : Series, writingIndexs : WritingIndex[]}
}

export default async function writingLoader(request : Request) : Promise<WritingDetailLoderData>{
  const searchParams = new URL(request.url).searchParams
  const writing = await fetchWritingByParams(searchParams);
  const authorP = await fetchUser(writing.authorUUID);
  const commentP = writing.comment.map(c => fetchUser(c.writer))
  const WritingContent = getWritingContent(writing.contentId)
  const comment = await Promise.all(commentP.map(async (c,i) => {
    return {user : await c, content : writing.comment[i].content, date : writing.comment[i].date}
  }))
  if(!WritingContent) throw new Error("Not Content")
  if(writing.formType === "series"){
    const seriesP = await fetchSeries(writing.seriesUUID || null)
    const [author, series] = await Promise.all([authorP, seriesP])
    return {writing : {...writing}, author : {...author}, WritingContent : WritingContent , 
    commentContent : comment,
    seriesPayload : {series : series.series, writingIndexs : series.writingIndexs}}
  }
  else {
    const author = await authorP
    return {writing : writing, author : author, commentContent : comment, WritingContent : WritingContent}
  }
}

const MDX_MODULES = import.meta.glob('/src/content/writing/**/*.mdx');

function getWritingContent(contentId : string){
  if(!contentId) return null

  const link = Object.keys(MDX_MODULES).find(p => p.endsWith(`/${contentId}.mdx`))
  if(!link) return null

  return lazy(async () => {
    const mod = await MDX_MODULES[link]!();
    return { default: (mod as { default: React.ComponentType<any> }).default };
  });
}