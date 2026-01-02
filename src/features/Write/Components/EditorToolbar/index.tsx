/*
  에디터 툴바 컴포넌트
  글에 그림을 넣거나 글자를 강조하는 등의 유틸리티 기능 제공
*/

import SubmitButton from "shared/components/blocks/InputComponets/SubmitButton";
import { useEditorContext } from "../../context/useEditorContext";
import styles from "features/Write/styles/EditorToolbar.module.css";
import TextToolbar from "./TextToolbar";
import UtilToolbar from "./UtilToolbar";
import CancelButton from "shared/components/blocks/InputComponets/CancelButton";
import { useNavigate } from "react-router-dom";
import { api } from "axios/api";
import { useMessageContext } from "app/providers/message";
import { useWriteContext } from "features/Write/context/useWriteContext";

export default function EditorToolbar() {
  const navigate = useNavigate();
  const {editor} = useEditorContext();
  const [messageApi] = useMessageContext();
  const {title, categoryId, seriesUuid, tag} = useWriteContext();

  if (!editor) {
    return null;
  }

  const handleCancel = () => {
    const result = confirm("현재 글은 저장되지 않습니다. 그래도 저장하시겠습니까?");
    if(result) {
      navigate("/");
    }
  }

  const handleSubmit = async () => {
    if(!title.trim()) {
      messageApi.open({type : "error", content : "제목을 입력해주세요.", duration : 2});
      return;
    }
    if(!categoryId) {
      messageApi.open({type : "error", content : "카테고리를 선택해주세요.", duration : 2});
      return;
    }
    if(!editor?.getJSON()) {
      messageApi.open({type : "error", content : "글을 입력해주세요.", duration : 2});
      return;
    }
    await api.post("/writing", {
      title : title,
      content : editor?.getJSON(),
      categoryId : categoryId,
      seriesUuid : seriesUuid,
      tag : tag,
    }). then(() => {
      messageApi.open({type : "success", content : "글 작성 완료", duration : 2});
      navigate("/");
    }). catch(() => {
      messageApi.open({type : "error", content : "글 작성 실패", duration : 2});
    });
  }

  return (
    <div className={styles.toolbar}>
      <div className={styles.utilToolbarWrapper}>
        <UtilToolbar/>
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "10px"}}>
          <CancelButton onClick={handleCancel} label="취소"/>
          <SubmitButton onClick={handleSubmit} label="작성"/>
        </div>
      </div>
      <div className={styles.textToolbarWrapper}>
        <TextToolbar/>
      </div>
    </div>
  );
}
