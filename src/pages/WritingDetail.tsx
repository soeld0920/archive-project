import {  Suspense } from "react";
import { useLoaderData, useRouteLoaderData } from "react-router-dom"
import styles from "styles/modules/DetailPage.module.css"
import WritingHero from "features/Detail/Components/WritingHero";
import WritingMetaBar from "features/Detail/Components/WritingMetaBar";
import UserProfileCard from "components/UserProfileInfo";
import WritingInteraction from "features/Detail/Components/WritingBtn";
import { Flex } from "antd";
import WritingSubInteraction from "features/Detail/Components/WritingSubInteraction";
import Wrapper from "components/blocks/Wrapper";
import WritingTag from "features/Detail/Components/WritingTag";
import WritingComment from "features/Detail/Components/WritingComment";
import { RevalidatorProvider } from "features/Detail/context/Revalidator";
import type { WritingDetailLoaderData } from "features/Search/types/WritingDetailLoaderData";

export default function WritingDetail(){
  const pageData : WritingDetailLoaderData = useLoaderData()
  const rookData : WritingDetailLoaderData | undefined =  useRouteLoaderData('root')
  if(!rookData) return

  const {writing,WritingContent, commentContent} = pageData
  const currentUser = rookData.currentUser
  const {UUID,tag} = writing;

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
            <UserProfileCard userUUID={currentUser.UUID}/>
          </aside>
          <div className={styles.article}>
            <Suspense fallback={<div>콘텐츠 불러오는 중…</div>}>
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