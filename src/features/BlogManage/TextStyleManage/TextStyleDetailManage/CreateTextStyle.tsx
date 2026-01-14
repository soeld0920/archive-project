import SubmitButton from "shared/components/blocks/InputComponets/SubmitButton";
import commonStyles from "../../style/BlogManage.module.css";
import InputText from "shared/components/blocks/InputComponets/InputText";
import Dropdown from "shared/components/blocks/InputComponets/Dropdown";
import InputTextNumber from "shared/components/blocks/InputComponets/InputTextNumber";
import { ColorPicker } from "antd";
import { FaAlignLeft, FaAlignCenter, FaAlignRight } from "react-icons/fa";
import { useState } from "react";
import { api } from "axios/api";
import type { FontFamily, TextRole } from "shared/types/entity/TextStyle";
import styles from "../../style/TextStyle.module.css";
import classNames from "classnames";
import { useMessageContext } from "app/providers/message";

export default function CreateTextStyle(){
  const [name, setName] = useState(""); 
  const [fontFamily, setFontFamily] = useState<FontFamily | undefined>(undefined);
  const [textRole, setTextRole] = useState<TextRole | undefined>(undefined);
  const [size, setSize] = useState<number | null>(null);
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [strikeout, setStrikeout] = useState(false);
  const [color, setColor] = useState<string | null>(null);
  const [highlight, setHighlight] = useState<string | null>(null);
  const [align, setAlign] = useState<string | null>(null);
  const [messageApi] = useMessageContext();
  
  const handleSubmit = async () => {
    if(!name){
      messageApi.open({type : "error", content : "이름을 입력해주세요.", duration : 2});
      return;
    }
    if(!fontFamily){
      messageApi.open({type : "error", content : "폰트를 선택해주세요.", duration : 2});
      return;
    }
    if(!textRole){
      messageApi.open({type : "error", content : "역할을 선택해주세요.", duration : 2});
      return;
    }
    if(!size){
      messageApi.open({type : "error", content : "폰트 크기를 입력해주세요.", duration : 2});
      return;
    }

    await api.post("/textStyle",{
      name,
      size,
      fontFamilyId : fontFamily.id,
      textRoleCode : textRole.code,
      bold,
      italic,
      underline,
      strikeout,
      color,
      highlight,
      align,
    }).then((res) => {
      messageApi.open({type : "success", content : "글자 스타일 생성 성공", duration : 2});
      window.location.reload();
    }).catch((error) => {
      messageApi.open({type : "error", content : "글자 스타일 생성 실패", duration : 2});
    });
  }

  const setFontFamilyOptions = async () => {
    const response = await api.get("/textStyle/font");
    return response.data;
  }

  const setTextRoleOptions = async () => {
    const response = await api.get("/textStyle/role");
    return response.data;
  }

  return(
    <div className={commonStyles.formSection}>
      <div className={styles.textStyleConfigContainer}>
        <h3>글자 스타일 설정</h3>
        <InputText value={name} setValue={setName} placeholder="이름" />
        {/* 첫 번째 줄: fontFamily, textRole, size */}
        <div className={styles.textStyleRow}>
          <Dropdown 
            options={[]} 
            setOptions={setFontFamilyOptions} 
            toString={(value) => value.name} 
            value={fontFamily} 
            onChange={(value: FontFamily) => setFontFamily(value)} 
            label={fontFamily?.name || "폰트 선택"} 
            isSame={(value: FontFamily | undefined, option: FontFamily) => value?.id === option.id}
          />
          <Dropdown 
            options={[]} 
            setOptions={setTextRoleOptions} 
            toString={(value) => value.name} 
            value={textRole} 
            onChange={(value: TextRole) => setTextRole(value)} 
            label={textRole?.name || "역할 선택"} 
            isSame={(value: TextRole | undefined, option: TextRole) => value?.code === option.code}
          />
          <div style={{display: "flex", alignItems: "center", gap: "5px"}}>
            <InputTextNumber 
              value={size} 
              setValue={setSize} 
              placeholder="폰트 크기" 
              width="100px"
            />
            <span>pt</span>
          </div>
        </div>

        {/* 두 번째 줄: bold, italic, underline, strikeout */}
        <div className={styles.textStyleRow}>
          <button 
            onClick={() => setBold(!bold)} 
            className={classNames(styles.textStyleButton, bold && styles.textStyleButtonActive)}
          >
            B
          </button>
          <button 
            onClick={() => setItalic(!italic)} 
            className={classNames(styles.textStyleButton, italic && styles.textStyleButtonActive)}
          >
            I
          </button>
          <button 
            onClick={() => setUnderline(!underline)} 
            className={classNames(styles.textStyleButton, underline && styles.textStyleButtonActive)}
          >
            U
          </button>
          <button 
            onClick={() => setStrikeout(!strikeout)} 
            className={classNames(styles.textStyleButton, strikeout && styles.textStyleButtonActive)}
          >
            S
          </button>
        </div>

        {/* 세 번째 줄: color, highlight */}
        <div className={styles.textStyleRow}>
          <ColorPicker 
            onChangeComplete={(value) => setColor(value.toHexString())} 
            value={color || undefined}
          >
            <div className={styles.colorPickerTrigger}>
              <span>T</span>
              <div className={styles.colorView} style={{background: color || "#444444"}}/>
            </div>
          </ColorPicker>
          <ColorPicker
            onChangeComplete={(value) => setHighlight(value.toHexString())}
            value={highlight || undefined}
          >
            <div className={styles.highlightPickerTrigger} style={{border: `2px solid ${highlight || "#444444"}`}}>
              <span>T</span>
            </div>
          </ColorPicker>
        </div>

        {/* 네 번째 줄: align */}
        <div className={styles.textStyleRow}>
          <button 
            onClick={() => setAlign(align === "left" ? null : "left")} 
            className={classNames(styles.textAlignButton, align === "left" && styles.textAlignButtonActive)}
          >
            <FaAlignLeft/>
          </button>
          <button 
            onClick={() => setAlign(align === "center" ? null : "center")} 
            className={classNames(styles.textAlignButton, align === "center" && styles.textAlignButtonActive)}
          >
            <FaAlignCenter/>
          </button>
          <button 
            onClick={() => setAlign(align === "right" ? null : "right")} 
            className={classNames(styles.textAlignButton, align === "right" && styles.textAlignButtonActive)}
          >
            <FaAlignRight/>
          </button>
        </div>
      </div>
      <div className={commonStyles.formSectionButton}>
        <SubmitButton onClick={handleSubmit} label="저장" width="100px" height="100%"/>
      </div>
    </div>
  )
}