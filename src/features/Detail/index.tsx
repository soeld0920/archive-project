import { lazy, Suspense, useEffect, useState } from "react";
import styles from "./DetailPage.module.css"
import { useWritingContext, WritingProvider } from "./context/WritingContext";
import DetailHeader from "./Components/header";
import getInfoAboutWriting from "./libs/api/getInfoAboutWriting";
import Wrapper from "shared/components/blocks/Wrapper";
import WritingToc from "./Components/content/WritingToc";
import useTOC from "./hooks/useTOC";
import { WRITING_CONTENT_MODULES } from "mocks/libs/toWritingGlobKey";
import { Flex } from "antd";
// import WritingInteraction from "./Components/content/WritingBtn";
import WritingSubInteraction from "./Components/content/WritingSubInteraction";
import WritingTag from "./Components/content/WritingTag";
import WritingInteraction from "./Components/content/WritingBtn/index.tsx";
import putView from "./libs/api/putView.ts";
import WritingComment from "./Components/WritingComment.tsx";
import { useLoginContext } from "app/providers/login";
import type { User } from "shared/types/User.ts";

export function Detail({UUID} : {UUID : string}){
  return(
    <WritingProvider>
      <DetailContent UUID={UUID}/>
    </WritingProvider>
  )
}

function DetailContent({UUID} : {UUID : string}){
  const {setWriting, setAuthor, setSeries, setSeriesWritngsLink, setCommentContent} = useWritingContext()
  const {toc, writingRef} = useTOC();
  const [WritingContents, setWritingContents] = useState<React.LazyExoticComponent<React.ComponentType<any>> | null>(null);
  const [loginUser] = useLoginContext();
  useEffect(() => {
    const fetchData = async () => {
      const {writing, author, series, seriesWritngsLink, WritingContentKey, commentContent} = await getInfoAboutWriting(UUID);
      setWriting(writing);
      setAuthor(author);
      if(series) setSeries(series);
      if(seriesWritngsLink) setSeriesWritngsLink(seriesWritngsLink);
      setWritingContents(lazy(async () => {
        const mod = await WRITING_CONTENT_MODULES[WritingContentKey]!();
        return { default: (mod as { default: React.ComponentType<any> }).default };
      }));
      setCommentContent(commentContent);
      await putView(UUID, loginUser ? loginUser.UUID : "");
    }
    fetchData();
  }, [UUID])

  return (
      <main className={styles.wrapper}>
        <DetailHeader/>
        <Wrapper className={styles.contentWrapper}>
          <aside className={styles.aside}>
            <WritingToc toc={toc}/>
          </aside>
          <div className={styles.article} ref={writingRef}>
            {WritingContents && (
              <Suspense fallback={<div>콘텐츠 불러오는 중…</div>} >
                <WritingContents key={UUID}/>
              </Suspense>
            )}
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