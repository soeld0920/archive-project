/*
  에디터 툴바 컴포넌트
  글에 그림을 넣거나 글자를 강조하는 등의 유틸리티 기능 제공
*/

import SubmitButton from "shared/components/blocks/InputComponets/SubmitButton";
import { useEditorContext } from "../../context/useEditorContext";
import styles from "features/Write/styles/EditorToolbar.module.css";
import TextToolbar from "./TextToolbar";
import UtilToolbar from "./UtilToolbar";

export default function EditorToolbar() {
  const {
    handleSubmit,
    editor
  } = useEditorContext();

  if (!editor) {
    return null;
  }

  return (
    <div className={styles.toolbar}>
      <div className={styles.utilToolbarWrapper}>
        <UtilToolbar/>
        <SubmitButton onClick={handleSubmit} label="작성"/>
      </div>
      <div className={styles.textToolbarWrapper}>
        <TextToolbar/>
      </div>
    </div>
  );
}
