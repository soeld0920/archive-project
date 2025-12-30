/*
  태그 입력 컴포넌트
  글에 태그를 설정
*/

import TagInput from "./TagInput";
import styles from "features/Write/styles/Tags.module.css";
import TagInputItem from "./TagInputItem";
import { useWriteContext } from "features/Write/context/useWriteContext";

export default function Tags() {
  const {tag} = useWriteContext();

  return (
    <div className={styles.tagsWrapper}>
      {tag.map((tag) => (
        <TagInputItem key={tag} tag={tag}/>
      ))}
      <TagInput/>
    </div>
  )
}

