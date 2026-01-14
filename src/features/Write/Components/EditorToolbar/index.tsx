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
import { useNavigate, useParams } from "react-router-dom";
import { api } from "axios/api";
import { useMessageContext } from "app/providers/message";
import { useWriteContext } from "features/Write/context/useWriteContext";
import { useWriteModeContext } from "features/Write/context/useWriteModeContext";
import type { Tag } from "shared/types/entity/Tag";
import equal from "fast-deep-equal";
import type { JSONContent } from "@tiptap/react";

export default function EditorToolbar() {
  const navigate = useNavigate();
  const {editor} = useEditorContext();
  const [messageApi] = useMessageContext();
  const {title, categoryId, seriesUuid, tag} = useWriteContext();
  const {mode} = useWriteModeContext();
  const {UUID} = useParams();
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

  const handleEdit = async () => {
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

    const prev = await api.get(`/writing/${UUID}`).then((res) => res.data);
    const data : {title : string | null, content : JSONContent | null, categoryId : number | null, seriesUuid : string | null, tag : string[] | null} = {
      title : prev.writingTitle !== title ? title : null,
      content : editor?.getJSON(),
      categoryId : prev.categoryId !== categoryId ? categoryId : null,
      seriesUuid : prev.seriesUuid !== seriesUuid ? (seriesUuid == null ? "NOT SERIES" : seriesUuid) : null,
      tag : null
    }

    const isSameTagSet = (prevTags: Tag[] = [], nextTags: string[] = []) => {
      const prev = new Set(prevTags.map(t => t.tagName));
      const next = new Set(nextTags);
    
      if (prev.size !== next.size) return false;
      for (const name of prev) {
        if (!next.has(name)) return false;
      }
      return true;
    }

    if(isSameTagSet(prev.tag, tag)) {
      data.tag = null;
    } else {
      data.tag = tag;
    }

    await api.patch(`/writing/${UUID}`, data).then(() => {
      messageApi.open({type : "success", content : "글 수정 완료", duration : 2});
      navigate(`/writing/${UUID}`);
    }).catch(() => {
      messageApi.open({type : "error", content : "글 수정 실패", duration : 2});
    });
  }

  return (
    <div className={styles.toolbar}>
      <div className={styles.utilToolbarWrapper}>
        <UtilToolbar/>
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "10px"}}>
          <CancelButton onClick={handleCancel} label="취소"/>
          {mode === "write" ? <SubmitButton onClick={handleSubmit} label="작성"/> : <SubmitButton onClick={handleEdit} label="수정"/>}
        </div>
      </div>
      <div className={styles.textToolbarWrapper}>
        <TextToolbar/>
      </div>
    </div>
  );
}
