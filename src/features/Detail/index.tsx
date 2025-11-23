import {  Suspense, useEffect } from "react";
import styles from "./DetailPage.module.css"
import { Flex } from "antd";
import WritingSubInteraction from "features/Detail/Components/content/WritingSubInteraction";
import Wrapper from "shared/components/blocks/Wrapper";
import WritingTag from "features/Detail/Components/content/WritingTag";
import WritingComment from "features/Detail/Components/WritingComment";
import { RevalidatorProvider } from "features/Detail/context/Revalidator";
import useTOC from "features/Detail/hooks/useTOC";
import { useWritingContext, WritingProvider } from "./context/WritingContext";
import getWriting from "shared/lib/api/getWriting";
import getUser from "shared/lib/api/getUser";
import { useSearchParams } from "react-router-dom";
import putView from "./libs/api/putView";
import type { Series, Writing } from "shared/types/Writing";
import DetailHeader from "./Components/header";
import type { User } from "shared/types/User";
import getSeries from "shared/lib/api/getSeries";

export function Detail(){
  return(
    <WritingProvider>
      <RevalidatorProvider>
        <DetailContent/>
      </RevalidatorProvider>
    </WritingProvider>
  )
}

function DetailContent(){
  const {writing, setWriting, setAuthor, setSeries} = useWritingContext()
  const [params] = useSearchParams()
  const {toc, writingRef} = useTOC()

  useEffect(() => {
    getWriting(params.get("UUID") || "").then((writing : Writing) => {
      setWriting(writing);
      putView(writing.UUID);
      getUser(writing.authorUUID).then((author : User) => {
        setAuthor(author);
      });
      getSeries(writing.seriesUUID || "").then((series : Series | null) => {
        if(!series) return;
        setSeries(series);
      });
    });
  }, [params])

  return (
      <main className={styles.wrapper}>
        <DetailHeader/>
        <Wrapper className={styles.contentWrapper}>
          <aside className={styles.aside}>
            <WritingToc toc={toc}/>
          </aside>
          <div className={styles.article} ref={writingRef}>
            <Suspense fallback={<div>콘텐츠 불러오는 중…</div>} >
              <WritingContent key={UUID}/>
            </Suspense>
            <Flex justify="space-between" className={styles.subInfoWrapper}>
              <WritingInteraction/>
              <WritingSubInteraction UUID={writing.UUID} />
            </Flex>
            <WritingTag tag={tag}/>
          </div>
        </Wrapper>
        <WritingComment commentContent={commentContent} writing={writing} user={currentUser}/>
      </main>
  )
}