import {  Suspense, useState } from "react";
import { useLoaderData, useRouteLoaderData } from "react-router-dom"
import styles from "styles/modules/DetailPage.module.css"
import WritingHero from "features/Detail/Components/WritingHero";
import WritingMetaBar from "features/Detail/Components/WritingMetaBar";
import UserProfileCard from "components/UserProfileInfo";
import useGreatToggle from "features/Detail/hooks/useGreatToggle";
import type { Series, Writing, WritingIndex } from "types/Writing";
import type { User } from "types/User";
import WritingInteraction from "features/Detail/Components/WritingBtn";
import { Flex, message } from "antd";
import WritingSubInteraction from "features/Detail/Components/WritingSubInteraction";
import Wrapper from "components/blocks/Wrapper";

type WritingDetailLoaderData = {
  writing : Writing
  author : User
  WritingContent : React.LazyExoticComponent<React.ComponentType<any>>
  seriesPayload? : {series : Series, writingIndexs : WritingIndex[]}
  currentUser : User
}

export default function WritingDetail(){
  const pageData : WritingDetailLoaderData = useLoaderData()
  const rookData : WritingDetailLoaderData | undefined =  useRouteLoaderData('root')
  if(!rookData) return

  const {writing, author,WritingContent} = pageData
  const currentUser = rookData.currentUser
  const {UUID,comment,date,great,formType,mainCategory,subCategory,tag,title,view} = writing;
  const [greatState, handleGreatToggle] = useGreatToggle(great, currentUser.greatPostIds.includes(UUID))
  const [isBookmark, setIsBookmark] = useState(currentUser.bookmarkedPostIds.includes(UUID))
  const [messageApi, contextHolder] = message.useMessage()

  const seriesPayload : {series : Series, writingIndexs : WritingIndex[]} | undefined = pageData.seriesPayload
  const seriesIndex = seriesPayload?.writingIndexs.map(w => w.UUID).indexOf(UUID) ?? -1

  return (
    <main className={styles.wrapper}>
      {contextHolder}
      <header className={styles.header}>
        <Wrapper className={styles.headerWrapper}>
          <WritingHero author={author} formType={formType} title={title} mainCategory={mainCategory} 
          subCategory={subCategory} series={seriesPayload?.series} seriesWritingList={seriesPayload?.writingIndexs} pageIdx={seriesIndex}/>
          <WritingMetaBar date={date} view={view} great={greatState.great} commentCount={comment.length}/> 
        </Wrapper>
      </header>
      <Wrapper className={styles.contentWrapper}>
        <aside className={styles.aside}>
          <UserProfileCard userUUID={currentUser.UUID}/>
        </aside>
        <div className={styles.article}>
          <Suspense fallback={<div>콘텐츠 불러오는 중…</div>}>
            <WritingContent
              // 필요하면 메타(태그/시리즈 등)도 프롭스로 전달 가능
              key={UUID}
              meta={{ title, tag, date, author }}
              
            />
          </Suspense>
          <Flex justify="space-between" className={styles.subInfoWrapper}>
            <WritingInteraction
            great={{clicked : greatState.clicked, onToggle : handleGreatToggle}} 
            content={{writing : writing, user : currentUser}} 
            comment={{count: comment.length}} 
            bookmark={{clicked : isBookmark, setClick : setIsBookmark}}
            message={{messageApi : messageApi}}
            />
            <WritingSubInteraction UUID={writing.UUID} message={{messageApi : messageApi}}/>
          </Flex>
        </div>
      </Wrapper>
    </main>
  )
}