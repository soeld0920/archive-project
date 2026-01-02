import classNames from "classnames";
import { useEditorContext } from "features/Write/context/useEditorContext";
import { useState } from "react";
import Dropdown from "shared/components/blocks/InputComponets/Dropdown";
import SubmitButton from "shared/components/blocks/InputComponets/SubmitButton";
import styles from "features/Write/styles/EditorToolbar.module.css";

type SelectCodeBlockProps = {
  active: boolean;
  setActive: (active: boolean) => void;
}

export default function SelectCodeBlock({active, setActive} : SelectCodeBlockProps) {
  const [value, setValue] = useState<string>("html");
  const {handleCode} = useEditorContext();
  const options = ["html", "css", "js", "ts", "python", "java", "c", "cpp"]
  const onClick = () => {
    handleCode(value as "html" | "css" | "js" | "ts" | "python" | "java" | "c" | "cpp");
    setActive(false);
  }

  return (
    <div className={classNames(styles.selectCodeBlock, active ? styles.selectCodeBlockActive : "")}>
      <Dropdown options={options} value={value} onChange={setValue} label={`언어선택 : ${value}`} toString={(value) => value as string} />
      <SubmitButton onClick={onClick} label="선택" /> 
    </div>
  );
}