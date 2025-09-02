import type React from "react";
import { createCSSProps, initialState, symbolList, type TextState, type TextSymbol } from "types/textSymbol";

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

export function textShow(text : string){
  const parts = parseTextToRun(text);
  console.log(parts)
  return (
    <>
      {
        parts.map((run, idx) => {
          const {text, state} = run;
          return(
            <span key={idx} style={{...createCSSProps(state), whiteSpace : "pre-line"}}>{text}</span>
          )
        })
      }
    </>
  )
}


type TextRun = {text : string, state : TextState};

const TOGGLES = symbolList.filter(sy => sy.kind === "toggle");
const COMMANDS = symbolList.filter(sy => sy.kind === "command");

const parseTextToRun = (text : string) : TextRun[] => {
  const result : TextRun[] = [];
  let buffer = "";
  let state = {...initialState};
  let i = 0;

  
  const flush = () => {
    if(buffer === "") return;

    const run = {text : buffer, state : {...state}};
    result.push(run);
    buffer = "";
  }


  while(i < text.length){
    const ch = text[i];

    let found : TextSymbol | undefined= TOGGLES.find(t => text.startsWith(t.symbol,i));
    if(found !== undefined){
      i += found.symbol.length;
      flush()
      const key = found.state as keyof TextState
      state = {...state, ...{[key] : !state[key]}}
      continue;
    }

    if(ch === "{" && (i === 0 || text[i-1] !== "`")){
      const endIdx = text.indexOf("}",i);
      if(endIdx === -1){
        buffer += ch;
        i++;
        continue;
      }
      const rawInner = text.slice(i+1, endIdx);
      let isCloseTag = rawInner.startsWith("/");
      let [name, ...rest] = (isCloseTag ? rawInner.slice(1) : rawInner).split(/\s+/);
      const rowValue = rest.join(" ");
      const cmd = COMMANDS.find(com => com.command === name);
      if(cmd !== undefined){
        flush();
        const key = cmd.command as keyof TextState;
        state = {...state, ...{[key] : (rowValue !== "" ? cmd.parse(rowValue) : initialState[key])}};
        i = endIdx + 1;
        continue;
      }
    }
    buffer += ch;
    i++;
  }
  flush();
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