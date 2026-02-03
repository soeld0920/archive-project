import { useEffect } from "react";
import styles from "./DetailPage.module.css"
import DetailHeader from "./Components/header";
import Wrapper from "shared/components/blocks/Wrapper";
import WritingToc from "./Components/content/WritingToc";
import useTOC from "./hooks/useTOC";
import { Flex } from "antd";
import WritingSubInteraction from "./Components/content/WritingSubInteraction";
import WritingTag from "./Components/content/WritingTag";
import WritingInteraction from "./Components/content/WritingBtn/index.tsx";
import WritingComment from "./Components/WritingComment.tsx";
import { EditorContent, useEditor } from "@tiptap/react";
import { editorExtensions } from "shared/constants/editor.tsx";
import PageHeader from "shared/components/features/PageHeader.tsx";
import { FaBook } from "react-icons/fa6";
import { useWritingDetail } from "./hooks/query/useWritingDetail.tsx";
import { useParams } from "react-router-dom";


export function Detail(){
  const {toc, writingRef} = useTOC();
  const {UUID} = useParams();
  
  const viewer = useEditor({
    editable: false,
    extensions: editorExtensions, // ✅ 편집기랑 동일
    content: { type: 'doc', content: [] },
  })

  const {data : writingDetail, error, isLoading, isError} = useWritingDetail(UUID ?? "")

  useEffect(() => {
    if(!writingDetail) return;
    let tipTapJson =
      typeof writingDetail?.content === 'string'
        ? JSON.parse(writingDetail.content)
        : writingDetail.content ?? { type: 'doc', content: [] }

    viewer?.commands.setContent(tipTapJson) // ✅ JSON 그대로 넣기
  
  }, [UUID, writingDetail])

  if(isError) {console.error(error); return <div className="text-2xl font-[Galmuri] text-gray-700">글을 찾을 수 없습니다.</div>;}
  else if(isLoading) {return <div className="text-2xl font-[Galmuri] text-gray-700">글을 불러오는 중입니다...</div>;}

  return (
      <main className={styles.wrapper}>
        <PageHeader icon={<FaBook/>} title="Writing"/>
        <DetailHeader/>
        <Wrapper className={styles.contentWrapper}>
          <aside className={styles.aside}>
            <WritingToc toc={toc}/>
          </aside>
          <div className={styles.article} ref={writingRef}>
            <EditorContent editor={viewer}/>
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