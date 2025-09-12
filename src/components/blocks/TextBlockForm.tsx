import type { ReactNode } from "react";

type TextBlockFormProps = {
  children : ReactNode,
  title : string;
  hasGap? :boolean
  img? :string
}

export default function TextBlockForm({children, title, hasGap = true, img} : TextBlockFormProps){
  const gap = hasGap ? "50px" : "20px"
  return(
    <div>
      <h2>{title}</h2>
      {img && <img src={img} style={{maxWidth:"80%"}}/>}
      <p style={{whiteSpace : "pre-wrap", paddingTop : "5px", paddingBottom : gap, fontSize : "16px"}}>
        {children}
      </p>
    </div>
  )
}