/*
  Input type = text 컴포넌트
  각종 string을 입력받는 컴포넌트.
*/

import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import styles from "shared/styles/shared-components/InputText.module.css";

type InputTextProps = {
  value: string;
  setValue: (value: string) => void;
  width?: string;
  height?: string;
  placeholder?: string;
  className?: string;
}

export default function InputText({value, setValue, width, height, placeholder, className} : InputTextProps){
  const classes = classNames(styles.inputText, className);
  const inputRef = useRef<HTMLInputElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [autoWidth, setAutoWidth] = useState<number | undefined>(undefined);
  const [autoHeight, setAutoHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (!width && measureRef.current && inputRef.current) {
      // placeholder가 있고 value가 비어있으면 placeholder 크기 측정
      const textToMeasure = value || placeholder || "";
      measureRef.current.textContent = textToMeasure;
      const measuredWidth = measureRef.current.offsetWidth;
      // padding을 고려한 너비 계산
      const computedStyle = window.getComputedStyle(inputRef.current);
      const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;
      const paddingRight = parseFloat(computedStyle.paddingRight) || 0;
      const minWidth = 10; // 최소 너비
      setAutoWidth(Math.max(measuredWidth + paddingLeft + paddingRight, minWidth));
    }
  }, [value, placeholder, width]);

  useEffect(() => {
    if (!height && inputRef.current) {
      setAutoHeight(inputRef.current.scrollHeight);
    }
  }, [value, height]);

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
          value={value} 
          onChange={e => setValue(e.target.value)} 
          className={classes}
        />
      </div>
    </>
  )
}