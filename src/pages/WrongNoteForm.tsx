import type { WrongNote } from "types/note"
import { useState } from "react";
import { saveNote } from "lib/storage";
import NoteForm from "../components/NoteForm";
import "styles/mouseHoverEvent.css"

export default function WrongNoteForm(){
  const LEVELS = [1,2,3,4,5] as const;
  type Difficulty = typeof LEVELS[number];
  const [title, setTitle] = useState("");
  const [problemTitle, setProblemTitle] = useState("");
  const [problemLink, setProblemLink] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>(3);
  const [content, setContent] = useState("");
  

  const onSubmit = (e : React.FormEvent) => {
    e.preventDefault();
    if(!title || !content || !problemTitle || !problemLink){
      alert("빈 값이 있습니다!!");
      return
    }

    const date = new Date().toISOString();
  
    const note: WrongNote = {
      id : crypto.randomUUID(),
      title : title,
      createdAt : date,
      content : content,
      category : "Wrong",
      problemTitle : problemTitle,
      problemLink : problemLink,
      difficulty : difficulty
    }

    alert("저장 완료되었습니다.");
    saveNote(note);
    setTitle("");
    setProblemTitle("");
    setProblemLink("");
    setDifficulty(3);
    setContent("");
  }


  return (
    <>
      <h2>
        새 오답노트 추가
      </h2>
      <input type="text" placeholder="제목 입력" value={title} onChange={(e) => setTitle(e.target.value)}></input><br/>
      <input type="text" placeholder="문제제목 입력" value={problemTitle} onChange={(e) => setProblemTitle(e.target.value)}></input><br/>
      <input type="text" placeholder="문제링크 입력" value={problemLink} onChange={(e) => setProblemLink(e.target.value)}></input><br/>

      <div>
        {
          LEVELS.map(n => {
            const id = n;
            return (
              <label key={id}>
                <input type="radio" name="difficulty" checked={difficulty === id} onChange={() => setDifficulty(id)}/>
                {id}
              </label>
            )
          }
          )
        }
      </div>

      <NoteForm value={content} onChange={setContent}/>

      <button onClick={(e) => onSubmit(e)}>제출하기</button>
    </>
  )
}