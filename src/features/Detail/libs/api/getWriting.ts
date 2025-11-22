import type { Writing } from "shared/types/Writing";

export default async function getWriting(UUID : string) : Promise<Writing>{
  const response = await fetch(`/api/writing/${UUID}`, {method : "GET"});
  if(!response.ok) throw new Error("Failed to fetch writing");
  return response.json();
}