import type React from "react";

type HighlightSpan = {
  children : React.ReactNode,
  className? : string
}

export function HighlightSpan({children,className} : HighlightSpan){
  return (
    <span
      className={`HighlightSpan ${className}`}
    >{children}</span>
  )
}

export function HighlightP({children,className} : HighlightSpan){
  return (
    <p
      className={`HighlightSpan ${className}`}
    >{children}</p>
  )
}