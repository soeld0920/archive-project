export function toISOTime(time : string){
  return time.substring(0,10) + " " + time.substring(11,16)
}