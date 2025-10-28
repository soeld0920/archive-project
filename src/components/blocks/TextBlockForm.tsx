import type { ReactNode } from "react";

type TextBlockFormProps = {
  children : ReactNode,
  title : string;
  hasGap? :boolean
  img? :string;
  removePTag? : boolean;
}

export default function TextBlockForm({children, title, hasGap = true, img, removePTag = false} : TextBlockFormProps){
  const gap = hasGap ? "150px" : "40px"
  return(
    <div>
      <h2>{title}</h2>
      {img && <img src={img} style={{maxWidth:"80%", margin : "10px 0px", border : "1px solid #333"}}/>}
      {removePTag ? 
      <div style={{whiteSpace : "pre-wrap", paddingTop : "5px", paddingBottom : gap}}>
        {children}
      </div>
      :
      <p style={{whiteSpace : "pre-wrap", paddingTop : "5px", paddingBottom : gap}}>
        {children}
      </p>}
    </div>
  )
}