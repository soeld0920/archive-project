import { useFilterStateContext } from "../../context/FilterState";
import { useState, useEffect } from "react";
import styles from "../../Recent.module.css";

export default function TagFilter() {
  const { filter, setFilterTag } = useFilterStateContext();
  const [tags, setTags] = useState<string>(filter?.tag?.join(', ') || "");

  // filter.tag 변경 시 tags 동기화
  useEffect(() => {
    setTags(filter?.tag?.join(', ') || "");
  }, [filter?.tag]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTags(value);
    const tagArray = value.split(',').map(t => t.trim()).filter(t => t);
    setFilterTag(tagArray.length > 0 ? tagArray : undefined);
  };

  return (
    <div className={styles.filterRow}>
      <label className={styles.label}>태그</label>
      <input 
        type="text"
        value={tags}
        onChange={handleChange}
        placeholder=",로 태그 분류"
        className={styles.input}
      />
    </div>
  );
}

