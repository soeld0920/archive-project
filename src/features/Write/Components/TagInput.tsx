/*
  태그 입력 컴포넌트
  글에 태그를 설정
*/

import { useState } from "react";
import styles from "features/Write/styles/TagInput.module.css";

export default function TagInput() {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    } else if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
      // 빈 입력 상태에서 Backspace를 누르면 마지막 태그 제거
      removeTag(tags.length - 1);
    }
  };

  const addTag = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && !tags.includes(trimmedValue)) {
      setTags([...tags, trimmedValue]);
      setInputValue("");
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    const newTags = pastedText
      .split(",")
      .map(tag => tag.trim())
      .filter(tag => tag && !tags.includes(tag));
    
    if (newTags.length > 0) {
      setTags([...tags, ...newTags]);
      setInputValue("");
    }
  };

  return (
    <div className={styles.tagInputWrapper}>
      <label className={styles.label}>태그</label>
      <div className={styles.tagInputContainer}>
        {tags.map((tag, index) => (
          <span key={index} className={styles.tag}>
            #{tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className={styles.removeButton}
              aria-label={`${tag} 태그 제거`}
            >
              ×
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onPaste={handlePaste}
          placeholder={tags.length === 0 ? "태그를 입력하세요 (쉼표로 구분)" : ""}
          className={styles.input}
        />
      </div>
      <p className={styles.hint}>Enter 또는 쉼표(,)로 태그를 추가할 수 있습니다</p>
    </div>
  );
}

