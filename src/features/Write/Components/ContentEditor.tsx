/*
  콘텐츠 에디터 컴포넌트
  TipTap 에디터를 사용하여 글 내용을 입력
*/

import { EditorContent } from "@tiptap/react";
import styles from "features/Write/styles/ContentEditor.module.css";
import { useEditorContext } from "../context/useEditorContext";

export default function ContentEditor() {
  const { editor } = useEditorContext();

  if (!editor) {
    return <div>에디터를 불러오는 중...</div>;
  }

  return (
    <div className={styles.editorWrapper}>
      <EditorContent editor={editor} className={styles.editorContent} />
    </div>
  );
}

