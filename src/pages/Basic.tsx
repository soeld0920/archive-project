import Header from "components/layout/Header";
import { PageList } from "components/PageList";
import { Link } from "react-router-dom";

export default function Basic(){
  return(<>
    <Header/>
    <MainContent/>
  </>)
}

function MainContent(){
  return(
    <section>
      <h2>코딩의 기초</h2>
      <p>
        코딩의 기본 뼈대는 같아요. <br />
        친절하게 알려드릴게요.
      </p>
      <Link to="/basic/note01">{"바로 보러가기 > "}</Link>
    </section>
  )
}