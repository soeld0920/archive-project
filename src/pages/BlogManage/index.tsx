import ManageNav from "features/BlogManage/ManageNav";
import { Outlet } from "react-router-dom";
import Wrapper from "shared/components/blocks/Wrapper";

export default function BlogManage(){
  return(
    <Wrapper style={{display : "flex", marginTop : "50px"}}>
      <ManageNav/>
      <main style={{width : "840px", marginLeft : "100px", height : "auto"}}>
        <Outlet/>
      </main>
    </Wrapper>
  )
}