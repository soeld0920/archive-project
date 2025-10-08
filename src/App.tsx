import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from 'pages/Home'
import { TextStyles } from 'styles/TextStyles'
import "styles/font.css"
import Etc from 'pages/Etc'
import { Colors } from 'styles/Colors'
import { Layouts } from 'styles/Layouts'
import Search from 'pages/Search'
import Ground from 'pages/Ground'
import Header from 'components/layout/Header'
import PageDetail from 'pages/PageDetail'

function App() {
  return (
    <HashRouter>
      <TextStyles/>
      <Colors/>
      <Layouts/>
      <TextStyles/>
      <Header/>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/search/*' element={<Search/>}/>
        {/* <Route path='/page' element={<PageDetail/>}/> */}
        <Route path='/ground' element={<Ground/>}/>
        <Route path='/etc/*' element={<Etc/>}/>
      </Routes>
    </HashRouter>
  )
}

export default App
