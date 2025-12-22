//모든 요청에 들어가는 image url은 UUID.확장자만 전달해야함
//이를 실행하는 함수

export function normalizeImageUrl(url: string): string {
  return url.split("/").pop() ?? "";
}