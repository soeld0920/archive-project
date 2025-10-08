import type { ReactNode } from "react"

type HighlightBlockProps = {
  children : ReactNode,
  title? : string,
  hasGap? :boolean,
  type : "addition" | "exception" | "compare" | "example",
  className? : string,
  removePTag? : boolean
}

export default function HighlightBlock({children, title, hasGap = true, type, className , removePTag = false} : HighlightBlockProps){
  const gap = hasGap ? "150px" : "40px"

  switch(type){
    case "addition" : return(
    <div className={className} style={{backgroundColor : "#cbeff2d6", border : "3px solid #9af8ff", borderRadius : "20px", padding : "1rem 1.5rem", marginBottom : gap}}>
      <h3>💡더 알아보기 : {title}</h3>
      {removePTag ? 
      <div style={{whiteSpace : "pre-wrap", paddingTop : "5px"}}>
        {children}
      </div>:
      <p style={{whiteSpace : "pre-wrap", paddingTop : "5px"}}>
        {children}
      </p>
      }
    </div>
    )
    case "exception" : return(
    <div className={className} style={{backgroundColor : "#f9e6ffd8", border : "3px solid #f9e6ff", borderRadius : "20px", padding : "1rem 1.5rem", marginBottom : gap}}>
      <h3>⚠️항상 존재하는 예외</h3>
      {removePTag ? 
      <div style={{whiteSpace : "pre-wrap", paddingTop : "5px"}}>
        {children}
      </div>:
      <p style={{whiteSpace : "pre-wrap", paddingTop : "5px"}}>
        {children}
      </p>
      }
    </div>
    )
    case "compare" : return(
      <div className={className} style={{backgroundColor : "#e6fff1d7", border : "3px solid #72ff82", borderRadius : "20px", padding : "1rem 1.5rem", marginBottom : gap}}>
        <h3>비교하기 - {title}</h3>
        {removePTag ? 
        <div style={{whiteSpace : "pre-wrap", paddingTop : "5px"}}>
          {children}
        </div>:
        <p style={{whiteSpace : "pre-wrap", paddingTop : "5px"}}>
          {children}
        </p>
        }
      </div>
    )
    case "example" : return(
      <div className={className} style={{backgroundColor : "#fcffe6d6", border : "3px solid #e7ff72", borderRadius : "20px", padding : "1rem 1.5rem", marginBottom : gap}}>
        <h3>예시</h3>
        {removePTag ? 
        <div style={{whiteSpace : "pre-wrap", paddingTop : "5px"}}>
          {children}
        </div>:
        <p style={{whiteSpace : "pre-wrap", paddingTop : "5px"}}>
          {children}
        </p>
        }
      </div>
    )
  }
}