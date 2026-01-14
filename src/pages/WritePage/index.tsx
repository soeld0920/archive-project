/*
  글 작성 페이지
  url : /write
*/
import WriteFeature from "features/Write";

export default function WritePage({mode} : {mode : "write" | "edit"}){
  return(<WriteFeature mode={mode}/>)
}