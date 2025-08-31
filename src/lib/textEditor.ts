//(전체 문자열, 시작인덱스, 끝인덱스, 삽입할 값의 앞, 뒤?) => {변환된 텍스트, 변환덱 택스트의 신규 시작점, 끝점}
export function wrapRange(
  value : string,
  start : number,
  end : number,
  before : string,
  after = before,
){
  const substring = value.slice(start,end);
  const result = value.slice(0,start) + before + substring + after + value.slice(end,value.length);
  const newStart = start + before.length;
  const newEnd = newStart + substring.length;
  return {result, newStart, newEnd};
}

//(전체 문자열, 시작인덱스, 끝인덱스, 삽입할 태그의 이름, 태그의 값?) => {변환된 텍스트, 변환덱 택스트의 신규 시작점, 끝점}
export function wrapTag(
  value : string,
  start : number,
  end : number,
  tagName : string,
  tagValue? : string
){
  const startTag = tagValue ? `{${tagName} ${tagValue}}` : `{${tagName}}`;
  const endTag = `{/${tagName}}`;
  return wrapRange(value,start,end,startTag,endTag);
}