import createGetFetch from "../utils/createGetFetch";

export default async function getWritingContentKey(contentId : string){
  const key = await createGetFetch<string>(`/api/writingContent/${contentId}`);
  return key;
}