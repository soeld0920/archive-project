import classNames from "classnames";
import type React from "react";

type WrapperProps = {
  children : React.ReactElement | React.ReactElement[];
  className? : string;
  center? : boolean;
  flex? :boolean;
}

export default function Wrapper({children,className,center = true, flex = false} : WrapperProps){
  const classes = classNames(className,{WrapperCenter : center})
  return(
    <div style={{width : "100%", maxWidth : "1440px", height : "100%"}} className={classes}>
      {children}
    </div>
  )
}