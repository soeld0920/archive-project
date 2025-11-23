import type { Series } from "shared/types/Writing";

export default async function getSeries(UUID : string) : Promise<Series | null>{
  const response = await fetch(`api/series/${UUID}`, {method : "GET"});
  if(!response.ok) return null;
  return response.json();
}