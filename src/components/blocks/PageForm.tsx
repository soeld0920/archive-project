import Header from "components/layout/Header";
import { seriesMap } from "content/series";
import type { ReactNode } from "react";
import type { Page } from "types/PageInfo";

type PageFormProps = {
  children : ReactNode,
  page : Page;
}

export default function PageForm({children, page} : PageFormProps){
  let series = seriesMap.get(page.seriesId)
  if(!series)return <>카테고리를 찾을 수 없습니다.</>
  return(
    <>
      <Header/>
      <div style={{width:'100%',height : "auto",marginTop : "20px"}}>
        {series.title && <h4 style={{height: "20px", paddingTop : "5px", paddingLeft : "5px", color : "#aaa"}}>{series.title}</h4>}
        <h1 style={{height: "50px",borderBottom : "3px solid #666", paddingTop : "10px",paddingLeft : "5px",}}>
          {page.seriesNum && `#${page.seriesNum}. `}{page.title}
        </h1>
        <div style={{display : "flex"}}>
          <div style={{width : "10%", borderRight : "3px solid #666", boxSizing : "border-box", paddingTop : "10px"}}>카테고리분류</div>
          <div style={{width : "70%",height : "auto",marginTop : "10px", marginLeft : "5px"}}>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}