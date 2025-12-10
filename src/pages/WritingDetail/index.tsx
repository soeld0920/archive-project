/*
  글 상세 페이지
  url : /writing/:UUID
*/

import { Detail } from "features/Detail";
import { useParams } from "react-router-dom";

export default function WritingDetail(){
  const {UUID} = useParams();
  if(!UUID) return <div>UUID not found</div>;
  return(
    <Detail UUID={UUID}/>
  )
}