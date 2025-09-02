import { categoryToString } from "lib/categoryTransform";
import { getNotes } from "lib/storage";
import { textShow } from "lib/textTransform";
import { toISOTime } from "lib/time";
import { useParams } from "react-router-dom"

export default function NoteDetail(){
  const {id} = useParams();
  const note = getNotes().find(n => n.id === id);

  if(!note){
    return <p> 404 not found </p>
  }

  return(
    <>
      <p>{note.category}</p>
      <h2>{note.title}</h2>
      <span>{toISOTime(note.createdAt)}</span> <br />
      <span>{categoryToString(note.category)}</span>
      <hr />
      <p>{textShow(note.content)}</p>
    </>
  )
}