export function parseSizeStringToNum(size: string): number {
  return parseInt(size.replace("px", ""));
}