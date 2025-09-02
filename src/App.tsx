import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'
import WrongNoteForm from 'pages/WrongNoteForm'
import NotesList from 'pages/NotesList'
import NoteDetail from 'pages/NoteDetail'

function App() {
  return (
    <BrowserRouter basename='/archive-project'>
      <nav>
        <Link to="/">목록</Link> | <Link to="/new">새 노트</Link>
      </nav>
      <Routes>
        <Route path='/new' element={<WrongNoteForm/>}/>
        <Route path='/' element={<NotesList/>}/>
        <Route path='/note/:id' element={<NoteDetail/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
