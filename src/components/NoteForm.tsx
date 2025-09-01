import { useRef} from "react";
import { FaAlignJustify,FaAlignLeft,FaAlignCenter,FaAlignRight } from "react-icons/fa";
import ColorForm from "./ColorForm";
import { wrapRange, wrapTag as wrapTagUtil } from "lib/textEditor";
import FontSizeForm from "./FontSizeForm";

type NoteFormProps = {
  value : string;
  onChange : (next : string) => void;
}

export default function NoteForm({value, onChange} : NoteFormProps){
  const taRef = useRef<HTMLTextAreaElement>(null);
  

    const wrapSelection = (before : string, after = before) => {
      const ta = taRef.current;
      if(!ta) return;
      const {selectionStart , selectionEnd, value} = ta;
      const {result, newStart, newEnd} = wrapRange(value, selectionStart, selectionEnd, before, after);
      onChange(result)
  
      requestAnimationFrame(() => {
        ta.focus();
        ta.setSelectionRange(newStart, newEnd);
      });
    }
  
    const wrapTag = (tagName : string, tagValue? : string) => {
      const ta = taRef.current;
      if(!ta) return;
      const {selectionStart , selectionEnd, value} = ta;
      const {result, newStart, newEnd} = wrapTagUtil(value, selectionStart, selectionEnd, tagName, tagValue)
      onChange(result)
  
      requestAnimationFrame(() => {
        ta.focus();
        ta.setSelectionRange(newStart, newEnd);
      });
    }


  return(
    <>
      <ul role="toolbar" aria-label="서식" style={{display : "flex", width : "1280px", listStyle : "none", justifyContent : "space-between"}}>
        <li>
          <button type="button" aria-label="굵게" onClick={() => wrapSelection("**")}><b>B</b></button>
          <button type="button" aria-label="기울기" onClick={() => wrapSelection("%%")}><em>I</em></button>
          <button type="button" aria-label="밑줄" onClick={() => wrapSelection("__")}><span style={{textDecoration : "underline"}}>U</span></button> 
          <button type="button" aria-label="취소선" onClick={() => wrapSelection("~~")}><span style={{textDecoration : "line-through"}}>T</span></button>
        </li>
        <li>
          <button><FaAlignJustify/></button>
          <button><FaAlignLeft/></button>
          <button><FaAlignCenter/></button>
          <button><FaAlignRight/></button>
        </li>
      </ul>

      <div>글자 크기 설정 : <FontSizeForm onClick={(e) => wrapTag("fontSize",e)}/></div>
      <div>글자 색깔 설정 : <ColorForm onClick={(e) => wrapTag("color",e)}/></div>
      <div>하이라이트 색깔 설정 : <ColorForm onClick={(e) => wrapTag("bgColor",e)}/></div>

      <textarea ref={taRef} value={value} onChange={(e) => onChange(e.target.value)} style={{width: "1280px", height : "720px"}}/>
    </>
  )
}