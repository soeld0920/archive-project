import type { ReactNode } from "react"

type CodeBlockProps = {
  language : "python" | "c" | "java" | "html" | "css" | "js" | "react",
  children : ReactNode,
  className? : string,
}

export default function CodeBlock({language, children, className} : CodeBlockProps){
  return(
    <div className={className}>
      <div style={{width : "100%", height : "25px", fontSize : "15px", padding : "2px", backgroundColor : " #666", color : "yellow", borderTopLeftRadius : "5px", borderTopRightRadius : "5px", boxSizing : "border-box"}}>{language}</div>
      <pre style={{
        width : "100%", height : "calc(100% - 25px)",backgroundColor : "#000", 
        color : "#fff", borderBottomLeftRadius : "5px", borderBottomRightRadius : "5px",
        paddingTop : "2px", boxSizing : "border-box", padding : "2px"
        }}>
        <code style={{width:"100%", height : "100%", margin : "2px"}}>
          {children}
        </code>
      </pre>
    </div>
  )
}