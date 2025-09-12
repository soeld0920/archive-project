import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from 'pages/Home'
import Basic from 'pages/Basic'
import Basic01 from 'pages/contentPage/basic/Basic01'
import Basic02 from 'pages/contentPage/basic/Basic02'
import Basic03 from 'pages/contentPage/basic/Basic03'
import Basic04 from 'pages/contentPage/basic/Basic04'
import Basic05 from 'pages/contentPage/basic/Basic05'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        {/* <Route path='/basic' element={<Basic/>}/> */}
        <Route path='/basic' element={<Basic05/>}/>
      </Routes>
    </HashRouter>
  )
}

export default App
