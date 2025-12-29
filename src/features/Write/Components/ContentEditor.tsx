/*
  콘텐츠 에디터 컴포넌트
  TipTap 에디터를 사용하여 글 내용을 입력
*/

import { EditorContent } from "@tiptap/react";
import useCustomEditor from "../hook/useCustomEditor";
import styles from "features/Write/styles/ContentEditor.module.css";

export default function ContentEditor() {
  const { editor } = useCustomEditor();

  if (!editor) {
    return <div>에디터를 불러오는 중...</div>;
  }

  return (
    <div className={styles.editorWrapper}>
      <EditorContent editor={editor} className={styles.editorContent} />
    </div>
  );
}

