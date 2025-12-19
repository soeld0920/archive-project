/*
  Input type = number 컴포넌트
  각종 string을 입력받는 컴포넌트.
*/

import classNames from "classnames";
import { useEffect, useState } from "react";
import styles from "shared/styles/shared-components/InputText.module.css";

type InputTextNumberProps = {
  value: number | null;
  setValue: (value: number) => void;
  width?: string;
  height?: string;
  placeholder?: string;
  className?: string;
}

export default function InputTextNumber({value, setValue, width, height = "25px", placeholder, className} : InputTextNumberProps){
  const classes = classNames(styles.inputText, className);
  //입력된 값이 숫자, 음수, 소숫점을 허용하는 알고리즘
  const [buffer, setBuffer] = useState(value?.toString() ?? "");

  useEffect(() => {
    // value prop이 외부에서 변경되었을 때 buffer 동기화
    if(value !== null && value.toString() !== buffer && buffer !== ""){
      setBuffer(value.toString());
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // 빈 문자열 허용 (삭제 중일 수 있음)
    if(inputValue === ""){
      setBuffer("");
      setValue(0);
      return;
    }

    // 음수, 소숫점을 포함한 숫자 형식 검증
    // 허용: "-", "-123", "123", "123.45", "-123.45", ".5", "-.5"
    const numberPattern = /^-?\d*\.?\d*$/;
    
    if(numberPattern.test(inputValue)){
      setBuffer(inputValue);
      
      // 유효한 숫자로 변환 가능한 경우에만 setValue 호출
      const numValue = parseFloat(inputValue);
      if(!isNaN(numValue)){
        setValue(numValue);
      }
      // "-" 또는 "."만 입력된 경우는 buffer만 업데이트하고 setValue는 호출하지 않음
    }
  };

  return(
    <div style={{ width: width, height: height }}>
      <input type="text" 
      placeholder={placeholder} 
      value={buffer} 
      onChange={handleChange} 
      className={classes}
      />
    </div>
  )
}