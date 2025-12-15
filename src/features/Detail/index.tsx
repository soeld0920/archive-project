import { useEffect } from "react";
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
import type HttpError from "shared/types/HttpError.ts";
import ReactMarkdown from "react-markdown";
import WritingComment from "./Components/WritingComment.tsx";

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

  useEffect(() => {
    const fetchData = async () => {
      const writingDetail : WritingDetail = await fetch(`/api/writing/${UUID}`).then(res => res.json()).catch((e : HttpError) => {throw e});
      setWriting(writingDetail);
    }
    fetchData();
  }, [UUID])

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
            <ReactMarkdown>
              {writing.content}
            </ReactMarkdown>
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