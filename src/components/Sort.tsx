import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import type { Note } from "types/note";

type sortProps = {
  sortedNotes : Note[];
  onChange : (next : Note[]) => void;
}

type sortByProps = {
  com : string;
  reverse : boolean;
}

export default function Sort({sortedNotes, onChange} : sortProps){
  const [sortBy, setSortBy] = useState<sortByProps>({com : "최신순", reverse : false})

  const sort = ({com, reverse} : sortByProps) => {
    let notes : Note[] = [...sortedNotes];
    switch(com){
      case "최신순" : 
        notes.sort((a,b) => {
          if(reverse){return Date.parse(b.createdAt) - Date.parse(a.createdAt)}
          else{return Date.parse(a.createdAt) - Date.parse(b.createdAt)}});
        break;
      case "가나다순" : 
        notes.sort((a,b) => {
          if(!reverse){return a.title.localeCompare(b.title)}
          else{return b.title.localeCompare(a.title)} });
        break;
      case "카테고리순" : 
        notes.sort((a,b) => {
          if(!reverse){return a.category.localeCompare(b.category) === 0 ? a.title.localeCompare(b.title) : a.category.localeCompare(b.category)}
          else{return b.category.localeCompare(a.category) === 0 ? b.title.localeCompare(a.title) : b.category.localeCompare(a.category)} });
        break;
    }
    return notes;
  }

  useEffect(() => {
    onChange(sort(sortBy));
  },[sortBy])

  return(
    <div>
      <select value={sortBy.com} onChange={(e) => setSortBy({com : e.target.value, reverse : sortBy.reverse})}>
        <option value="최신순">최신순</option>
        <option value="가나다순">가나다순</option>
        <option value="카테고리순">카테고리순</option>
      </select>
      <button onClick={() => setSortBy({com : sortBy.com, reverse : !sortBy.reverse})}>{!sortBy.reverse ? <FaArrowUp/> : <FaArrowDown/>}</button>
    </div>
  )
}