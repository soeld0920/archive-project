import Sort from "components/Sort";
import { categoryToString } from "lib/categoryTransform";
import { getNotes as getNotesUtil, deleteNote as deleteNoteUtil } from "lib/storage"
import { textPreshow } from "lib/textTransform";
import { toISOTime } from "lib/time";
import { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";
import type { Note } from "types/note";

export default function NotesList(){
  let getNotes : () => Note[] = () => getNotesUtil();
  const [notes, setNotes] = useState<Note[]>([]);
  useEffect(() => setNotes(getNotes()), []);
  const [seletedIds, setSeletedIds] = useState<string[]>([]);

  const deleteNotes = () => {
    if(seletedIds.length === 0){
      alert("제거할 노트를 선택해주세요.");
      return;
    }

    let confirmed = confirm(`${seletedIds.length}개의 노트가 제거됩니다. 정말 제거하겠습니까?`)
    if(confirmed){
      for(let i = 0; i < seletedIds.length; i++){
        deleteNoteUtil(seletedIds[i])
      }
      setNotes(getNotes())
      setSeletedIds([]);
      alert("제거 완료되었습니다.");
    }
  }

  const toggleAll = (com : boolean) => {
    if(com){
      let arr : string[] = [];
      for(let i = 0; i < notes.length; i++){
        arr.push(notes[i].id);
      }
      setSeletedIds(arr);
    }else{
      setSeletedIds([]);
    }
  }

  return(
    <div>
      <div style={{display:"flex", justifyContent:"space-between", width:"1280px"}}>
        <div><input type="checkbox" checked={notes.length === seletedIds.length} onChange={(e) => toggleAll(e.target.checked)}/>전체 선택</div>
        <Sort sortedNotes={notes} onChange={setNotes}/>
        <div>
          <button onClick={deleteNotes}><FaRegTrashCan/></button>
        </div>
      </div>
      <ul>
        {notes.map(note => (
          <li key={note.id} style={{width : "1280px", height : "auto", margin : "10px 0px",borderTop : "3px solid #999", listStyle:"none"}}>
            <input type="checkbox" value={note.id} checked={seletedIds.includes(note.id)}
            onChange={(e) => {
              if(e.target.checked) setSeletedIds([...seletedIds, e.target.value])
              else setSeletedIds(seletedIds.filter((id) => e.target.value !== id))
            }}
            />
            <Link to={`/note/${note.id}`} className="mouseHoverEvent-Link">
              <h2>{note.title ? note.title : "빈 제목"}</h2>
              <span>{toISOTime(note.createdAt)}</span>
              <p>{note.content? textPreshow(note.content) : "빈 내용"}</p>
              <span>{categoryToString(note.category)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}