import { HashRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'
import WrongNoteForm from 'pages/WrongNoteForm'
import NotesList from 'pages/NotesList'
import NoteDetail from 'pages/NoteDetail'
import Home from 'pages/Home'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/new' element={<WrongNoteForm/>}/>
        <Route path='/list' element={<NotesList/>}/>
        <Route path='/note/:id' element={<NoteDetail/>}/>
      </Routes>
    </HashRouter>
  )
}

export default App
