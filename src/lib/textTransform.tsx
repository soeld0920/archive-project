import type React from "react";
import { symbolList, type TextState, type TextSymbol } from "types/textSymbol";

export function textPreshow(text : string) : React.ReactNode{
  let result = text.replace(/\*\*|\%\%|\_\_|\~\~/g,"");

  const out : string[] = [];
  let isEscape = false;
  let skipping = false;

  for(let i = 0; i < result.length; i++){
    const ch = result[i];

    if(ch === '`'){
      isEscape = true;
      continue
    }else if(!isEscape && ch === "{"){
      skipping = true;
      isEscape = false;
      continue;
    }else if(skipping && ch === "}"){
      skipping = false;
      isEscape = false;
      continue;
    }else if(skipping){
      continue;
    }

    isEscape = false;
    out.push(ch);
  }

  return renderLineBreak(out.join("").split("\n").slice(0,3).join("\n"));

}

export function textShow(text : string){}

const initialState : TextState = {
  bold : false,
  italic : false,
  underline : false,
  lineThrough : false,
  color : "",
  bgColor : "",
  fontSize : 0
}

type TextRun = {text : string, state : TextState};

const parseTextRun = (text : string) : TextRun[] => {
  const result : TextRun[] = [];
  let buffer = "";
  let state = {...initialState};

  const flush = (type : string) => {
    if(!buffer) return;

    let txt : string;

    switch(type){
      case "toggle":
        txt = buffer.slice(0,buffer.length - 2);
        break;
      case "command":
        txt = buffer.slice(0, buffer.lastIndexOf("{"));
        break;
    }

    const run = {text : txt, state : {...state}};
    result.push(run);
    buffer = "";
  }

  const matchToggle = () => {
    if(!buffer) return;
    for(const symbol of symbolList){
      if(symbol.kind !== "toggle") continue;
      if(buffer.endsWith(symbol.symbol)) return {[symbol.state as keyof TextState] : !state[symbol.state as keyof TextState]};
    }
  }

  const matchCommand = () => {
    if(!buffer) return;

    const out : string[] = [];
    let isEscape = false;
    let skipping = true;

    for(let i = 0; i < buffer.length; i++){
      const ch = buffer[i];

      if(ch === '`'){
        isEscape = true;
        continue
      }else if(!isEscape && ch === "{"){
        skipping = false;
        isEscape = false;
        continue;
      }else if(!skipping && ch === "}"){
        skipping = true;
        isEscape = false;
        continue;
      }else if(skipping){
        continue;
      }

      isEscape = false;
      out.push(ch);
    }

    const tag = out.join("").split(" ");

    if(tag.length === 1){
      const key = tag[0].slice(1,tag[0].length) as keyof TextState;
      return {[key] : initialState[key]};
    }else{
      return {[tag[0]] : tag[1]};
    }
  }

  for(let i = 0; i < text.length; i++){
    buffer += text[i];

    let symbol : Object | undefined = matchToggle();
    if(symbol){
      flush(symbol);
      const key = symbol.state as keyof TextState;
      state = {...state, [key] : !state[key]};
      continue;
    }
    symbol = matchCommand();
    if(symbol){
      
    }


  }

  return result;
}

function renderLineBreak(text : string){
  const parts = text.split("\n");
  return parts.map((str,idx) => (
    <span key={idx}>
      {str}
      {idx < parts.length - 1 && <br/>}
    </span>
  ))
}