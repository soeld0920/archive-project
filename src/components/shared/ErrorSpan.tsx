import type React from "react";

type HighlightSpan = {
  children : React.ReactNode,
  className? : string
}

export default function ErrorSpan({children,className} : HighlightSpan){
  return (
    <span
      className={`ErrorSpan ${className}`}
    >{children}</span>
  )
}