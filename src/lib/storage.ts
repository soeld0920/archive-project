import type { Note } from "types/note";

const KEY = 'ct-notes';

export function getNotes(): Note[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveNote(note: Note) {
  const notes = getNotes();
  notes.push(note);
  localStorage.setItem(KEY, JSON.stringify(notes));
}

export function deleteNote(id: string) {
  const next = getNotes().filter(n => n.id !== id);
  localStorage.setItem(KEY, JSON.stringify(next));
}

export function updateNote(id : string, patch : Partial<Note>){
  const next = getNotes().map(n => n.id === id ? {...n,...patch} : n);
  localStorage.setItem(KEY, JSON.stringify(next));
}