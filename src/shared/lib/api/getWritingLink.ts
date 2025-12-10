import type { WritingLink } from "shared/types/WritingLink";
import createGetFetch from "../utils/createGetFetch";

export default async function getWritingLink(UUID : string) : Promise<WritingLink | null>{
  return createGetFetch<WritingLink>(`/api/writingLink/${UUID}`);
}