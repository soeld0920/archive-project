import classNames from "classnames";
import { useEditorContext } from "features/Write/context/useEditorContext";
import styles from "features/Write/styles/EditorToolbar.module.css";
import { useEffect, useState } from "react";
import InputText from "shared/components/blocks/InputComponets/InputText";
import SubmitButton from "shared/components/blocks/InputComponets/SubmitButton";

type WritingLinkProps = {
  active: boolean;
  setActive: (active: boolean) => void;
}

export default function WritingLink({active, setActive} : WritingLinkProps) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const {insertLink} = useEditorContext();  
  const onClick = () => {
    setActive(false);
    insertLink(url, title);
  }

  useEffect(() => {
    if(active) {
      setTitle("");
      setUrl("");
    }
  }, [active]);

  return (
    <div className={classNames(styles.writingLink, active ? styles.writingLinkActive : "")}>
      <InputText value={title} setValue={setTitle} width="100%" height="100%" placeholder="링크 제목" />
      <InputText value={url} setValue={setUrl} width="100%" height="100%" placeholder="링크 주소" />
      <SubmitButton label="링크 추가" onClick={onClick} width= "50%" height="30px"/>
    </div>
  )
}