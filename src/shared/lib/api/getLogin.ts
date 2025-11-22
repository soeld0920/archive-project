export async function getLogin(){
  const response = await fetch("/api/login");
  return response.json();
}