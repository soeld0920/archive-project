export function clearParams(prev : URLSearchParams){
  const login = prev.get("login");
  if(!login) return new URLSearchParams();
  
  const next = new URLSearchParams();
  next.set("login", login);
  return next;
}