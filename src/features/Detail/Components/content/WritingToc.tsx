/*
  글 목차 컴포넌트
  - 글 목차 표시
 */
import type { TocType } from "../types/TocType"
import { Anchor } from "antd";
import processTocItem from "../libs/processTocItem";
import { useMemo } from "react";

type WritingTocProps = {
  toc : TocType[]
}

export default function WritingToc({toc} : WritingTocProps){
  const item = useMemo(() => processTocItem(toc),[toc]) ?? []
  return(
      <Anchor
        items={item}
        className={"writingToc"}
        offsetTop={16}
        affix={false}
        style={{position : "sticky", top : '16px'}}
      />
  )
}