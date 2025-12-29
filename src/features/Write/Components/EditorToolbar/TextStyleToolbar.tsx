import Dropdown from "shared/components/blocks/InputComponets/Dropdown";
import { api } from "axios/api";
import useTextStyle from "features/Write/hook/useTextStyle";
import type { FontFamily, TextRole, TextStyle } from "features/Write/types/TextStyle";
import InputTextNumber from "shared/components/blocks/InputComponets/InputTextNumber";
import styles from "features/Write/styles/EditorToolbar.module.css";

export default function TextStyleToolbar() {
  const {name, size, fontFamily, textRole, setName, setSize, setFontFamily, setTextRole, setTextStyle} = useTextStyle();
  
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
    <div className={styles.textStyleToolbar}>
      <Dropdown options={[]} setOptions={setNameOptions} 
      toString={(value) => value.name} value={name} onChange={setTextStyle} label={name} 
      isSame={(value : string, option : TextStyle) => value === option.name}
      className={styles.textStyleToolbarNameItem} border={false} arrow={false}/>

      <Dropdown options={[]} setOptions={setFontFamilyOptions} toString={(value) => value.name} 
      value={fontFamily.name} onChange={setFontFamily} label={fontFamily.name} 
      isSame={(value : string, option : FontFamily) => value === option.name} border={false} arrow={false}/>

      <Dropdown options={[]} setOptions={setTextRoleOptions} toString={(value) => value.name} 
      value={textRole.name} onChange={setTextRole} label={textRole.name} 
      isSame={(value : string, option : TextRole) => value === option.name} border={false} arrow={false}/>

      <div style={{display: "flex", alignItems: "center", gap: "0px"}}>
        <InputTextNumber value={size} setValue={setSize} border={false} />pt</div>
    </div>
  )
}