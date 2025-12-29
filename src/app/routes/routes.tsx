import Home from "pages/Home/index";
import Search from "pages/Search";
import WritingDetail from "pages/WritingDetail";
import Login from "pages/Login";
import Signin from "pages/Signin";
import { Route, Routes } from "react-router-dom";
import Research from "pages/Research";

export function AppRoutes(){
  return(
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/join" element={<Signin/>}/>
      <Route path="/search" element={<Search/>}/>
      <Route path="/writing/:UUID" element={<WritingDetail/>}/>
      <Route path="/research" element={<Research/>}/>
      {/* <Route path="/write" element={<WritePage/>}/> */}
    </Routes>
  )
}