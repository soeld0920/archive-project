import { MdSearch } from "react-icons/md";
import type { CSSProperties } from "react";

type SearchProps = {
  width?: CSSProperties["width"];
  height? : CSSProperties["height"];
  className? : string
}

export default function Search({width = 360, height = 40, className} : SearchProps){
  const radius = height as number / 2;
  return (
    <div style={{width, height,display:"flex"}} className = {className}>
      <input 
      type="text" 
      style={
        {
          flex : 1, height : "100%",
          borderTopLeftRadius :radius, borderBottomLeftRadius : radius, borderRight : "none",
          border:"1px solid #333",
          padding : "0 5px", boxSizing:"border-box",
          fontSize:"15px"}
      }
      placeholder="검색어를 입력해주세요"
      aria-label="사이트 검색"
      />
      <button 
        type="button"
        style={{
          width : "56px", height : "100%",
          display : "inline-flex",
          border:"1px solid #333",
          alignItems : "center", justifyContent : "center",
          borderTopRightRadius : radius, borderBottomRightRadius:radius, 
          fontSize:"25px", 
          backgroundColor:"#eee"}}
        ><MdSearch/></button>
    </div>
  )
}