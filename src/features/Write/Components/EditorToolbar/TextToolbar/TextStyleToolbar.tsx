import Dropdown from "shared/components/blocks/InputComponets/Dropdown";
import { api } from "axios/api";
import useTextStyle from "features/Write/hook/useTextStyle";
import type { FontFamily, TextRole, TextStyle } from "features/Write/types/TextStyle";
import styles from "features/Write/styles/EditorToolbar.module.css";
import inputStyles from "shared/styles/shared-components/InputText.module.css";
import { useEditorContext } from "features/Write/context/useEditorContext";
import classNames from "classnames";

export default function TextStyleToolbar() {
  const {name, size, fontFamily, textRole, setSize, setFontFamily, setTextRole, setTextStyle} = useTextStyle();
  const {updateTextStyle, handleFontStyle, handleFontSize, handleTextStyle} = useEditorContext();

  const handleTextStyleChange = (ts : TextStyle) => {
    setTextStyle(ts);
    updateTextStyle(ts);
  }

  const setNameOptions = async () => {
    const response = await api.get("/textStyle/me");
    return response.data;
  }

  const setFontFamilyOptions = async () => {
    const response = await api.get("/textStyle/font");
    return response.data;
  }

  const setTextRoleOptions = async () => {
    const response = await api.get("/textStyle/role");
    return response.data;
  }
  
  return (
    <>
      <Dropdown options={[]} setOptions={setNameOptions} 
      toString={(value) => value.name} value={name} onChange={handleTextStyleChange} label={name} 
      isSame={(value : string, option : TextStyle) => value === option.name}
      className={styles.textStyleToolbarNameItem} border={false} arrow={false}/>

      <Dropdown options={[]} setOptions={setFontFamilyOptions} toString={(value) => value.name} 
      value={fontFamily.name} onChange={(value : FontFamily) => {setFontFamily(value); handleFontStyle(value.key)}} label={fontFamily.name} 
      isSame={(value : string, option : FontFamily) => value === option.name} border={false} arrow={false}/>

      <Dropdown options={[]} setOptions={setTextRoleOptions} toString={(value) => value.name} 
      value={textRole.name} onChange={(value : TextRole) => {setTextRole(value); handleTextStyle(value)}} label={textRole.name} 
      isSame={(value : string, option : TextRole) => value === option.name} border={false} arrow={false}/>

      <div style={{display: "flex", alignItems: "center", gap: "0px", width : "75px"}}>
        <input 
          type="number"
          value={size ?? ""}
          onChange={(e) => {
            const numValue = parseFloat(e.target.value);
            if (!isNaN(numValue)) {
              setSize(numValue);
              handleFontSize(numValue);
            } else if (e.target.value === "") {
              setSize(0);
              handleFontSize(0);
            }
          }}
          className={classNames(inputStyles.inputText, inputStyles.inputTextSettingSize)}
        />pt
      </div>
    </>
  )
}