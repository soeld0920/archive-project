import Wrapper from "shared/components/blocks/Wrapper";
import WritingHero from "./Hero";
import WritingMetaBar from "./MetaBar";
import styles from "features/Detail/DetailPage.module.css";

export default function DetailHeader(){
  return(
    <header className={styles.header}>
      <Wrapper className={styles.headerWrapper}>
        <WritingHero/>
        <WritingMetaBar/> 
      </Wrapper>
    </header>
  )
}