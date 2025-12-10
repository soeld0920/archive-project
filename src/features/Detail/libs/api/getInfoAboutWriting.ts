/*
  detail에 필요한 정보를 묶어 반환하는 함수.
*/

import getSeries from "shared/lib/api/getSeries";
import getUser from "shared/lib/api/getUser";
import getWriting from "shared/lib/api/getWriting";
import getWritingLink from "shared/lib/api/getWritingLink";
import getWritingContentKey from "shared/lib/api/getWritingContentKey";
import type HttpError from "shared/types/HttpError";
import type { Series } from "shared/types/Writing";
import type { WritingLink } from "shared/types/WritingLink";
import getComments from "shared/lib/api/getComments";

export default async function getInfoAboutWriting(UUID : string){
  const writing = await getWriting(UUID).catch((e : HttpError) => {throw e});
  const author = await getUser(writing.authorUUID).catch((e : HttpError) => {throw e});
  let series : Series;
  let seriesWritngsLink : {
    prev : WritingLink | null,
    next : WritingLink | null
  } = {prev : null, next : null};
  const WritingContentKey = await getWritingContentKey(writing.contentId).catch((e : HttpError) => {throw e});
  const commentContent = await getComments(writing.UUID).catch((e : HttpError) => {throw e});
  if(writing.formType === "series"){
    series = await getSeries(writing.seriesUUID!).catch((e : HttpError) => {throw e;});
    const index = series?.WritingList.findIndex(w => w === UUID);
    if(index === undefined) throw new Error("Not Found Writing in Series");
    seriesWritngsLink.prev = index > 0 ? await getWritingLink(series.WritingList[index - 1]) : null;
    seriesWritngsLink.next = index < series.WritingList.length - 1 ? await getWritingLink(series.WritingList[index + 1]).catch(() => null) : null;
    return {writing, author, series, seriesWritngsLink, WritingContentKey,commentContent};
  }
  else {
    return {writing, author, WritingContentKey,commentContent};
  }
}