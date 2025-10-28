import classNames from "classnames";
import type React from "react";

type WrapperProps = {
  children : React.ReactElement[]
  className? : string
  center? : boolean
}

export default function Wrapper({children,className,center = true} : WrapperProps){
  const classes = classNames(className,{WrapperCenter : center})
  return(
    <div style={{width : "100%", maxWidth : "1440px", height : "100%"}} className={classes}>
      {children}
    </div>
  )
}