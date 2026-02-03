import { useFilterContent } from "features/Search/context/FilterContent";
import styles from "features/Search/Search.module.css";

export default function AuthorFilterPanel() {
  const {filterState, toggleAuthor, setAuthor} = useFilterContent();

  const id = "byAuthor";
  return (
    <li>
      <fieldset>
        <legend className="sr-only">작성자 필터</legend>
        <label htmlFor={id} className={styles.filterOption}>
          <input
            id={id}
            type="checkbox"
            checked={filterState.byAuthor}
            onChange={e =>toggleAuthor(e.currentTarget.checked)}
          />
          <p>작성자명으로 검색</p>
        </label>

        <input
          type="text"
          placeholder="작성자 입력"
          value={filterState.author ?? ""}
          onChange={e =>setAuthor(e.currentTarget.value)}
          disabled={!filterState.byAuthor}
        />
      </fieldset>
    </li>
  );
}