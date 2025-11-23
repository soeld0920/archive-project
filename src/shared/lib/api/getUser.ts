import type { User } from "shared/types/User";

export default async function getUser(UUID : string) : Promise<User>{
  const response = await fetch(`/api/user/${UUID}`, {method : "GET"});
  if(!response.ok) throw new Error("Failed to fetch author");
  return response.json();
}