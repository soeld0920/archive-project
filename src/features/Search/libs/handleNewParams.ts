export function handleNewParams<T>(prevParams: URLSearchParams, value : T | null, key : string) {
  const next = new URLSearchParams(prevParams);
  if(value === null){
    next.delete(key);
  }else{
    next.set(key, value?.toString() ?? "");
  }
  return next;
}