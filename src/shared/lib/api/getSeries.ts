import type { Series } from "shared/types/Writing";
import createGetFetch from "../utils/createGetFetch";

export default async function getSeries(UUID : string) : Promise<Series>{
  return createGetFetch<Series>(`/api/series/${UUID}`);
}