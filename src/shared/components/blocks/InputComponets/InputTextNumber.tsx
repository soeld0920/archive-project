/*
  Input type = number 컴포넌트
  각종 string을 입력받는 컴포넌트.
*/

import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import styles from "shared/styles/shared-components/InputText.module.css";

type InputTextNumberProps = {
  value: number | null;
  setValue: (value: number) => void;
  width?: string;
  height?: string;
  placeholder?: string;
  className?: string;
  border?: boolean;
}

export default function InputTextNumber({value, setValue, width, height , placeholder, className, border = true} : InputTextNumberProps){
  const isSettingSize = !(width == undefined && height == undefined);
  const classes = classNames(styles.inputText, className, border ? styles.inputTextBorder : "", isSettingSize ? styles.inputTextSettingSize : "");
  //입력된 값이 숫자, 음수, 소숫점을 허용하는 알고리즘
  const [buffer, setBuffer] = useState(value?.toString() ?? "");
  const inputRef = useRef<HTMLInputElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [autoWidth, setAutoWidth] = useState<number | undefined>(undefined);
  const [autoHeight, setAutoHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    // value prop이 외부에서 변경되었을 때 buffer 동기화
    if(value !== null && value.toString() !== buffer && buffer !== ""){
      setBuffer(value.toString());
    }
  }, [value]);

  useEffect(() => {
    if (!width && measureRef.current && inputRef.current) {
      // placeholder가 있고 buffer가 비어있으면 placeholder 크기 측정
      const textToMeasure = buffer || placeholder || "";
      measureRef.current.textContent = textToMeasure;
      const measuredWidth = measureRef.current.offsetWidth;
      // padding을 고려한 너비 계산
      const computedStyle = window.getComputedStyle(inputRef.current);
      const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;
      const paddingRight = parseFloat(computedStyle.paddingRight) || 0;
      const minWidth = 10; // 최소 너비
      setAutoWidth(Math.max(measuredWidth + paddingLeft + paddingRight, minWidth));
    }
  }, [buffer, placeholder, width]);

  useEffect(() => {
    if (!height && inputRef.current) {
      setAutoHeight(inputRef.current.scrollHeight);
    }
  }, [buffer, height]);

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

  const containerStyle: React.CSSProperties = {};
  if (width) {
    containerStyle.width = width;
  } else if (autoWidth !== undefined) {
    containerStyle.width = `${autoWidth}px`;
  }
  
  if (height) {
    containerStyle.height = height;
  } else if (autoHeight !== undefined) {
    containerStyle.height = `${autoHeight}px`;
  }

  if(!isSettingSize){
    return (
      <>
        {!width && (
          <span
            ref={measureRef}
            style={{
              position: 'absolute',
              visibility: 'hidden',
              whiteSpace: 'pre',
              fontSize: 'var(--scales-basic)',
              fontFamily: 'inherit',
              padding: '3px',
            }}
          />
        )}
        <input 
          ref={inputRef}
          type="text" 
          placeholder={placeholder} 
          value={buffer} 
          onChange={handleChange} 
          className={classes}
          style={containerStyle}
        />
      </>
    )
  }

  return(
    <>
      {!width && (
        <span
          ref={measureRef}
          style={{
            position: 'absolute',
            visibility: 'hidden',
            whiteSpace: 'pre',
            fontSize: 'var(--scales-basic)',
            fontFamily: 'inherit',
          }}
        />
      )}
      <div style={containerStyle}>
        <input 
          ref={inputRef}
          type="text" 
          placeholder={placeholder} 
          value={buffer} 
          onChange={handleChange} 
          className={classes}
        />
      </div>
    </>
  )
}