import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from '@tiptap/starter-kit'

export default function WriteEditor(){
  const editor = useEditor({
    extensions: [StarterKit],
    content: 'Hello World!',
  })

  return (
    <div>
      <button onClick={
        () => editor?.chain().focus().toggleBold().run()}>bold</button>
      <button onClick={
        () => editor?.chain().focus().toggleItalic().run()}>italic</button>
      <button onClick={
        () => editor?.chain().focus().toggleUnderline().run()}>underline</button>
      <button onClick={
        () => editor?.chain().focus().toggleStrike().run()}>strike</button>
      <button onClick={
        () => editor?.chain().focus().toggleCode().run()}>code</button>
      <EditorContent editor={editor} />
    </div>
  )
}