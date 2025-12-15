import Home from "pages/Home/index";
import Search from "pages/Search";
import WritingDetail from "pages/WritingDetail";
import Login from "pages/Login";
import Signin from "pages/Signin";
import { Route, Routes } from "react-router-dom";

export function AppRoutes(){
  return(
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/search" element={<Search/>}/>
      <Route path="/writing/:UUID" element={<WritingDetail/>}/>
    </Routes>
  )
}