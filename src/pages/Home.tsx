import Header from "components/layout/Header"
import Search from "components/Search"
import { UpdateList } from "components/UpdateList"
import { FaDiscord, FaGithub } from "react-icons/fa"
import styles from "styles/Home.module.css"

export default function Home(){
  return (
    <>
      <Header/>
      <MainContent/>
    </>
  )
}

function MainContent(){
  return(
    <section className={styles.mainContent}>

      <p className={styles.welcome}>
        <span style={{fontSize : "45px", fontWeight : "900"}}>Welcome!</span> <br />
        <span style={{fontSize : "30px", fontWeight : "700"}}>TECH.text</span>에 오신 것을 환영합니다. <br />
        한국어로 IT 정보를 정리한 개인 프로젝트입니다. <br />
        편히 이용바라며, 버그 및 정보 오류는 공식 디스코드로 문의바랍니다.
      </p>

      <div className={styles.update}>
        <h4 style={{fontSize : "25px", color:"#999"}}>업데이트 내역</h4>
        <UpdateList className={styles.updateList}/>
      </div>

      <div>
        <Search width={360} height={40} className={styles.search}/>
      </div>

      <div className={styles.btnDiv}>
        <a href="/" className={styles.linkBtn}><FaDiscord /></a>
        <a href="https://github.com/soeld0920/archive-project/tree/gh-pages/assets" className={styles.linkBtn}><FaGithub /></a>
      </div>

    </section>
  )
}
