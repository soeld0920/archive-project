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
import { api } from "axois/api";
import StarterKit from "@tiptap/starter-kit";
import { generateHTML } from "@tiptap/react";

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
  const [html, setHtml] = useState<string>("");
  useEffect(() => {
    if (hasViewedRef.current) return;
    hasViewedRef.current = true;
  
    const fetchData = async () => {
      const response = await api.get(`/writing/${UUID}`);
      const writingDetail: WritingDetail = response.data;
      
      // content가 TipTap JSON 형식인 경우 HTML로 변환
      try {
        let tipTapJson;
        
        if (typeof writingDetail.content === 'string') {
          // JSON 문자열인 경우 파싱
          tipTapJson = JSON.parse(writingDetail.content);
        } else if (typeof writingDetail.content === 'object' && writingDetail.content !== null) {
          // 이미 객체인 경우 그대로 사용
          tipTapJson = writingDetail.content;
        } else {
          // 예상치 못한 형식인 경우 빈 doc으로 처리
          tipTapJson = { type: "doc", content: [] };
        }
        
        // TipTap JSON을 HTML로 변환
        const html = generateHTML(tipTapJson, [StarterKit]);
        setHtml(html);
      } catch (e) {
        // 파싱 또는 변환 실패 시 빈 문자열로 설정
        console.error("Failed to parse TipTap content:", e);
        setHtml("");
      }
      
      setWriting(writingDetail);
  
      await api.post(`/writing/${UUID}/view`);
    };
  
    fetchData();
  }, [UUID]);

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
            <div dangerouslySetInnerHTML={{ __html: html }} />
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