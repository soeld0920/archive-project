/*
  TextArea 컴포넌트
  여러 줄 텍스트 입력을 받는 컴포넌트
*/

import classNames from "classnames";
import { forwardRef } from "react";
import styles from "shared/styles/shared-components/InputText.module.css";

type TextaresProps = {
  value: string;
  setValue: (value: string) => void;
  width?: string;
  height?: string;
  placeholder?: string;
  className?: string;
  rows?: number;
}

const Textares = forwardRef<HTMLTextAreaElement, TextaresProps>(
  ({value, setValue, width, height = "200px", placeholder, className, rows = 10}, ref) => {
    const classes = classNames(styles.inputText, className);
    
    return(
      <div>
        <textarea 
          ref={ref}
          value={value} 
          onChange={e => setValue(e.target.value)} 
          placeholder={placeholder} 
          className={classes}
          rows={rows}
          style={{ resize: "none", border: "none", width: width, height: height }}
        />
      </div>
    )
  }
);

Textares.displayName = "Textares";

export default Textares;