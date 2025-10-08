import { Route, Routes } from "react-router-dom";
import Asciicode from "./contentPage/etc/Asciicode";

export default function Etc(){
  return(
    <Routes>
      <Route index element={<Asciicode/>}/>
    </Routes>
  )
}

function Index(){
  return(
    <>
    ㅁㄴㅇㄹ
    </>
  )
}