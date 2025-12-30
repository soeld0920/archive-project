import { useMessageContext } from "app/providers/message";
import { useWriteContext } from "features/Write/context/useWriteContext";
import styles from "features/Write/styles/Tags.module.css";
import { useState } from "react";

export default function TagInput() {
  const {tag, setTag} = useWriteContext();
  const [value, setValue] = useState<string>("");
  const [messageApi] = useMessageContext();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      const v = value.trim();
      if(v === ""){
        messageApi.open({type : "error", content : "태그를 입력해주세요.", duration : 2});
        return;
      }
      if(tag.includes(v)){
        messageApi.open({type : "error", content : "이미 존재하는 태그입니다.", duration : 2});
        return;
      }
      setTag([...tag, v]);
      setValue("");
    }
  };

  return (
    <div className={styles.tagItem}>
      #
      <input 
        className={styles.tagInput} 
        type="text" 
        value={value} 
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="태그 입력" 
      />
    </div>
  )
}