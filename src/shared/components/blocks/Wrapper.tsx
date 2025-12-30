/*
  여러 컴포넌트를 감싸는 Wrapper 컴포넌트 
  width를 1440px로 고정하고 중앙 정렬을 기본값으로 설정
*/

import classNames from "classnames";
import type React from "react";

type WrapperProps = {
  children : React.ReactElement | React.ReactElement[];
  className? : string;
  center? : boolean;
  flex? :boolean;
  style? : React.CSSProperties;
}

export default function Wrapper({children,className,center = true, flex = false, style} : WrapperProps){
  const classes = classNames(className,{WrapperCenter : center})
  return(
    <div style={{width : "100%", maxWidth : "1440px", height : "100%", ...style}} className={classes}>
      {children}
    </div>
  )
}