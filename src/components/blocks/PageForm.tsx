import Header from "components/layout/Header";
import type { ReactNode } from "react";

type PageFormProps = {
  children : ReactNode
}

export default function PageForm({children} : PageFormProps){
  return(
    <>
      <Header/>
      <div style={{width:'100%',height : "auto",marginTop : "20px"}}>
        {series.title && <h4 style={{height: "20px", paddingTop : "5px", paddingLeft : "5px", color : "#aaa", }}>{series.title}</h4>}
        <h1 style={{height: "60px",borderBottom : "3px solid #666", paddingTop : "10px",paddingLeft : "5px"}}>
          {page.seriesNum && `#${page.seriesNum}. `}{page.title}
        </h1>
        <div style={{display : "flex"}}>
          <div style={{width : "10%", borderRight : "3px solid #666", boxSizing : "border-box", paddingTop : "10px"}}>카테고리분류</div>
          <div style={{width : "70%",height : "auto",marginTop : "10px", marginLeft : "10px"}}>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}