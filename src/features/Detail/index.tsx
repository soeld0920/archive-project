import { useEffect, useRef, useState } from "react";
import styles from "./DetailPage.module.css"
import { useWritingContext, WritingProvider } from "./context/WritingContext";
import DetailHeader from "./Components/header";
import Wrapper from "shared/components/blocks/Wrapper";
import WritingToc from "./Components/content/WritingToc";
import useTOC from "./hooks/useTOC";
import { Flex } from "antd";
import WritingSubInteraction from "./Components/content/WritingSubInteraction";
import WritingTag from "./Components/content/WritingTag";
import WritingInteraction from "./Components/content/WritingBtn/index.tsx";
import type { WritingDetail } from "./types/WritingDetail.ts";
import WritingComment from "./Components/WritingComment.tsx";
import { api } from "axios/api.ts";
import { EditorContent, generateHTML, useEditor } from "@tiptap/react";
import { editorExtensions } from "shared/constants/editor.tsx";

export function Detail({UUID} : {UUID : string}){
  return(
    <WritingProvider>
      <DetailContent UUID={UUID}/>
    </WritingProvider>
  )
}

function DetailContent({UUID} : {UUID : string}){
  const {writing, setWriting} = useWritingContext()
  const {toc, writingRef} = useTOC();
  const hasViewedRef = useRef(false);

  const viewer = useEditor({
    editable: false,
    extensions: editorExtensions, // ✅ 편집기랑 동일
    content: { type: 'doc', content: [] },
  })

  useEffect(() => {
    if (hasViewedRef.current) return;
    hasViewedRef.current = true;
  
    const fetchData = async () => {
      const { data } = await api.get(`/writing/${UUID}`)
      const writingDetail = data
  
      let tipTapJson =
        typeof writingDetail.content === 'string'
          ? JSON.parse(writingDetail.content)
          : writingDetail.content ?? { type: 'doc', content: [] }
  
      viewer?.commands.setContent(tipTapJson) // ✅ JSON 그대로 넣기
      setWriting(writingDetail)
  
      await api.post(`/writing/${UUID}/view`)
    }
  
    if (!viewer) return
    fetchData()
  }, [UUID, viewer])

  if(writing == null) return <div>글을 찾을 수 없습니다.</div>;
  else if(writing == undefined) return <div>글을 불러오는 중입니다...</div>;

  return (
      <main className={styles.wrapper}>
        <DetailHeader/>
        <Wrapper className={styles.contentWrapper}>
          <aside className={styles.aside}>
            <WritingToc toc={toc}/>
          </aside>
          <div className={styles.article} ref={writingRef}>
            <EditorContent editor={viewer} className={styles.viewer} />
            <Flex justify="space-between" className={styles.subInfoWrapper}>
              <WritingInteraction/>
              <WritingSubInteraction/>
            </Flex>
            <WritingTag/>
          </div>
        </Wrapper>
        <WritingComment/>
      </main>
  )
}