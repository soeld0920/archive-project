import type { CommentRes } from "shared/types/Writing";
import createGetFetch from "../utils/createGetFetch";

export default async function getComments(UUID : string) : Promise<CommentRes[]>{
  return createGetFetch<CommentRes[]>(`/api/comments/${UUID}`);
}