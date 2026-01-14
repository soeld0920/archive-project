import Home from "pages/Home/index";
import Search from "pages/Search";
import WritingDetail from "pages/WritingDetail";
import Login from "pages/Login";
import Signin from "pages/Signin";
import { Route, Routes } from "react-router-dom";
import Research from "pages/Research";
import WritePage from "pages/WritePage";
import BlogManage from "pages/BlogManage";
import UserInfoManage from "features/BlogManage/UserInfoManage";
import SeriesManage from "features/BlogManage/SeriesManage";
import TextStyleManage from "features/BlogManage/TextStyleManage";

export function AppRoutes(){
  return(
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/join" element={<Signin/>}/>
      <Route path="/search" element={<Search/>}/>
      <Route path="/writing/:UUID" element={<WritingDetail/>}/>
      <Route path="/research" element={<Research/>}/>
      <Route path="/write" element={<WritePage mode="write"/>}/>
      <Route path="/write/:UUID/edit" element={<WritePage mode="edit"/>}/>
      <Route path="/manage/*" element={<BlogManage/>}>
        <Route index element={<div>메인 화면</div>}/>
        <Route path="userInfo" element={<UserInfoManage/>}/>
        <Route path="series" element={<SeriesManage/>}/>
        <Route path="textStyle" element={<TextStyleManage/>}/>
        <Route path="post" element={<div>글 설정</div>}/>
      </Route>
    </Routes>
  )
}