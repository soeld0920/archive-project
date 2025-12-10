import Wrapper from "shared/components/blocks/Wrapper";
import styles from "features/Detail/DetailPage.module.css";
import DetailHero from "./Hero";
import DetailMetaBar from "./MetaBar";

export default function DetailHeader(){
  return(
    <header className={styles.header}>
      <Wrapper className={styles.headerWrapper}>
        <DetailHero/>
        <DetailMetaBar/> 
      </Wrapper>
    </header>
  )
}