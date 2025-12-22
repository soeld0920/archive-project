import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useState } from "react";
import InputImage from "shared/components/blocks/InputComponets/InputImage";

export default function WriteEditor({editor} : {editor : Editor | null}){
  const [image, setImage] = useState<string | null>(null);


  useEffect(() => {
    if(image){
      editor?.chain().focus().setImage({ src: image }).run();
    }
  }, [image]);

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
      <InputImage setImage={setImage} width="100%" height="100%" type="icon" />
      <div style={{width: "100%", height: "auto", border: "1px solid #000"}}>
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}