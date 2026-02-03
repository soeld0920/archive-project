import { FormType } from "features/Search/types/searchFilter";
import styles from "features/Search/Search.module.css";
import { useFilterContent } from "features/Search/context/FilterContent";

const FormTypeLabel = {
  "all" : "모두 검색",
  "snippet" : "단편 검색",
  "series" : "시리즈 검색",
}

export default function FormFilterPanel() {
  const {filterState, setFormType} = useFilterContent();
  const onChange = (type : FormType) => setFormType(type);

  return (
    <li>
      <fieldset>
        <legend className="sr-only"> 글 종류</legend>
        {FormType.map(form => (
            <label className={styles.filterOption} key={form}>
              <input
                type="radio"
                name="formType"
                value={form}
                onChange={() => onChange(form)}
                checked={filterState.formType === form}
              />
              <p>{FormTypeLabel[form]}</p>
            </label>
        ))}
      </fieldset>
    </li>
  );
}