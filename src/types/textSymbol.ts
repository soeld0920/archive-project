import type React from "react";

type ToggleSymbol = {
  kind : "toggle";
  symbol : string;
  state : string;
  style? : Partial<React.CSSProperties>;
}

type CommandSymbol = {
  kind : "command";
  command : string;
  parse : (raw : string) => unknown;
  style : keyof React.CSSProperties
}

export type TextSymbol = ToggleSymbol | CommandSymbol

export const symbolList : TextSymbol[] = [
  {
    kind : "toggle",
    symbol : "**",
    state : "bold",
    style : {fontWeight : "700"}
  },
  {
    kind : "toggle",
    symbol : "%%",
    state : "italic",
    style : {textDecoration : "italic"}
  },
  {
    kind : "toggle",
    symbol : "__",
    state : "underline",
    style : {textDecoration : "underline"}
  },
  {
    kind : "toggle",
    symbol : "~~",
    state : "lineThrough",
    style : {textDecoration : "line-thorough"}
  },
  {
    kind : "command",
    command : "color",
    parse : (raw : string) => raw,
    style : "color"
  },
  {
    kind : "command",
    command : "bgColor",
    parse : (raw : string) => raw,
    style : "backgroundColor"
  },
  {
    kind : "command",
    command : "fontSize",
    parse : (raw : string) => parseInt(raw),
    style : "fontSize"
  },
]

export type TextState = {
  bold : boolean;
  italic : boolean;
  underline : boolean;
  lineThrough : boolean;
  color : string;
  bgColor : string;
  fontSize : number;
}

//symbolList[i] === TextState[i] 필수
export const initialState : TextState = {
  bold : false,
  italic : false,
  underline : false,
  lineThrough : false,
  color : "",
  bgColor : "",
  fontSize : 0
}

export const createCSSProps = (state : TextState) : React.CSSProperties | undefined => {
  if(state === initialState) return;

  let result : React.CSSProperties = {};
  const keys = Object.keys(state).map(key => key as keyof TextState);

  for(let i = 0; i < keys.length; i++){
    const key = keys[i];
    const symbol = symbolList[i];

    switch(symbol.kind){
      case "toggle":
        if(state[key]) result = {...result , ...symbol.style}
        break;
      case "command" :
        if(state[key] !== initialState[key]){
          result = {...result, ...{[symbol.style] : state[key]}}
        }
        break;
    }
  }
  
  return result;
}