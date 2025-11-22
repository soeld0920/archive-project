import {  Suspense, useEffect } from "react";
import styles from "styles/modules/DetailPage.module.css"
import WritingHero from "features/Detail/Components/WritingHero";
import WritingMetaBar from "features/Detail/Components/WritingMetaBar";
import WritingInteraction from "features/Detail/Components/WritingBtn";
import { Flex } from "antd";
import WritingSubInteraction from "features/Detail/Components/WritingSubInteraction";
import Wrapper from "shared/components/blocks/Wrapper";
import WritingTag from "features/Detail/Components/WritingTag";
import WritingComment from "features/Detail/Components/WritingComment";
import { RevalidatorProvider } from "features/Detail/context/Revalidator";
import WritingToc from "features/Detail/Components/WritingToc";
import useTOC from "features/Detail/hooks/useTOC";
import { useWritingContext, WritingProvider } from "./context/WritingContext";
import getWriting from "./libs/api/getWriting";
import { useSearchParams } from "react-router-dom";

export function Detail(){
  return(
    <WritingProvider>
      <DetailContent/>
    </WritingProvider>
  )
}

function DetailContent(){
  const [writing, setWriting] = useWritingContext()
  const [params] = useSearchParams()
  const {toc, writingRef} = useTOC()

  useEffect(() => {
    getWriting(params.get("UUID") || "").then(setWriting)
  }, [params])

  return (
    <RevalidatorProvider>
      <main className={styles.wrapper}>
        <header className={styles.header}>
          <Wrapper className={styles.headerWrapper}>
            <WritingHero/>
            <WritingMetaBar/> 
          </Wrapper>
        </header>
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
    </RevalidatorProvider>
  )
}