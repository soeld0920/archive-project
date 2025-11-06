import type { AnchorLinkItemProps } from "antd/es/anchor/Anchor";
import type { TocType } from "../types/TocType";

export default function processTocItem(tocList : TocType[]) : AnchorLinkItemProps[] | null{
  if(!tocList || tocList[0] === undefined) return null
  
  let result = makeAnchorItemTree(0, tocList.length, tocList) ?? null;

  console.log(result)
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

// 1 2 3 3 2 3 3 1

function makeAnchorItemTree(left : number, right : number, tocList : TocType[]) : AnchorLinkItemProps[] | undefined{
  if(left === right - 1) return[parseTocToAnchorItem(tocList[left])]

  let level = tocList[left].depth;
  let result : AnchorLinkItemProps[] = [];
  let children : AnchorLinkItemProps[] | undefined;
  let newRight : number | undefined;
  console.log(left, right, level)

  for(let i = right - 1; i >= left; i--){
    const dep = tocList[i].depth;
    if(level === dep) {
      if(newRight !== undefined) children = makeAnchorItemTree(i + 1, newRight, tocList)
      const item = parseTocToAnchorItem(tocList[i], children)
      result = [item, ...result]
      newRight = undefined
      children = undefined
    }
    else if(newRight === undefined){
      newRight = i + 1
    }
  }

  return result
}