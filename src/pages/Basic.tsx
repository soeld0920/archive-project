import Header from "components/layout/Header";
import { codingStart } from "content/series";
import { Link, Route, Routes } from "react-router-dom";

const series = [
  codingStart
]

export default function Basic(){
  return(
  <>
    <Routes>
      <Route index element={<Index/>}/>
      <Route path={`${series[0].id}/*`} element={<CodingBasic/>}/>
    </Routes>
  </>
  )
}

function Index(){
  return(
    <>
      <Header/>
      <MainContent/>
    </>
  )
}

function MainContent(){
  return(
    <section>
      <h2>코딩의 기초</h2>
      <p>
        코딩의 기본 뼈대는 같아요. <br />
        친절하게 알려드릴게요.
      </p>
      <Link to={`${series[0].id}`}>{"바로 보러가기 > "}</Link>
    </section>
  )
}

function CodingBasic(){
  return (
  <Routes>
    <Route index element={<CodingBasicIdx/>}/>
    {
      series[0].pages.map(page => (
        <Route path={`${page.seriesNum}`} element={page.element()}/>
      ))
    }
  </Routes>
  )
}

function CodingBasicIdx(){
  return(
    <>
      <Header/>
      <ul>
        {series[0].pages.map(page => (
          <li key={page.id}>
            <Link to={`${page.seriesNum}`}>{page.title} 바로가기</Link>
          </li>
        ))}
      </ul>
    </>
  )
}