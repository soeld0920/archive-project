/*
  mdx파일을 파싱하고 제목 레벨 트리 구조를 반환
  TODO : 시작 레벨이 깊은 상황 처리
*/

import type { AnchorLinkItemProps } from "antd/es/anchor/Anchor";
import type { TocType } from "../types/TocType";

export default function processTocItem(tocList : TocType[]) : AnchorLinkItemProps[] | null{
  if(!tocList || tocList[0] === undefined) return null
  
  let result = makeAnchorItemTree(0, tocList.length, tocList) ?? null;

  return result
}

function parseTocToAnchorItem(toc : TocType, children? : AnchorLinkItemProps[]) : AnchorLinkItemProps{
  return {
    key : toc.id,
    href : `#${toc.id}`,
    title : toc.text,
    children : children
  }
}

// 재귀적으로 목차 트리 구조 생성
// left, right : tocList의 인덱스 범위
// tocList : 목차 배열
function makeAnchorItemTree(left : number, right : number, tocList : TocType[]) : AnchorLinkItemProps[] | undefined{
  // 기저 사례: 단일 항목인 경우
  if(left === right - 1) return[parseTocToAnchorItem(tocList[left])]

  // level : 현재 처리 중인 목차 항목의 깊이
  // result : 현재 깊이에서 생성된 AnchorLinkItemProps 배열
  // children : 현재 깊이의 항목에 속하는 하위 항목들
  // newRight : 하위 항목들의 오른쪽 경계 인덱스
  let level = tocList[left].depth;
  let result : AnchorLinkItemProps[] = [];
  let children : AnchorLinkItemProps[] | undefined;
  let newRight : number | undefined;

  // 오른쪽에서 왼쪽으로 순회하며 현재 깊이의 항목들을 처리
  for(let i = right - 1; i >= left; i--){
    const dep = tocList[i].depth;

    // 현재 항목이 현재 깊이와 동일한 경우
    if(level === dep) {

      // 하위 항목이 존재하는 경우 재귀 호출로 트리 생성
      if(newRight !== undefined) children = makeAnchorItemTree(i + 1, newRight, tocList)

      // 현재 항목을 AnchorLinkItemProps로 변환하여 결과에 추가. children 포함
      const item = parseTocToAnchorItem(tocList[i], children)

      //result에 담고, 초기화
      result = [item, ...result]
      newRight = undefined
      children = undefined
    }
    // 현재 항목이 더 깊고 새로운 하위 항목의 우측 시작인 경우
    else if(newRight === undefined){
      newRight = i + 1
    }
  }

  return result
}