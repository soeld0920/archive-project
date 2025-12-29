import { createContext, useContext } from "react";
import useCustomEditor from "../hook/useCustomEditor";

type EditorValue = ReturnType<typeof useCustomEditor>;
const EditorContext = createContext<EditorValue | null>(null);

export function EditorProvider({children}: {children: React.ReactNode}){
  const editor = useCustomEditor();
  return (
    <EditorContext.Provider value={editor}>
      {children}
    </EditorContext.Provider>
  )
}

export function useEditorContext(){
  const context = useContext(EditorContext);
  if(!context) throw new Error("useEditorContext must be used within a editorProvider");
  return context;
}