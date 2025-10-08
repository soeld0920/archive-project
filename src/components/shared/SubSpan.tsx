import type React from "react";

type HighlightSpan = {
  children : React.ReactNode,
  className? : string
}

export function SubSpan({children,className} : HighlightSpan){
  return (
    <span
      className={`SubSpan ${className}`}
    >{children}</span>
  )
}

export function SubP({children,className} : HighlightSpan){
  return (
    <p
      className={`SubSpan ${className}`}
    >{children}</p>
  )
}