import type { Writing } from "shared/types/Writing";
import createGetFetch from "../utils/createGetFetch";

export default async function getWriting(UUID : string) : Promise<Writing>{
  return createGetFetch<Writing>(`/api/writing/${UUID}`);
}