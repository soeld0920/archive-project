/*
  Input type = text 컴포넌트
  각종 password 입력받는 컴포넌트.
*/

import classNames from "classnames";
import styles from "shared/styles/shared-components/InputText.module.css";

type InputPasswordProps = {
  value: string;
  setValue: (value: string) => void;
  width?: string;
  height?: string;
  placeholder?: string;
  className?: string;
}

export default function InputPassword({value, setValue, width, height = "25px", placeholder, className} : InputPasswordProps){
  const classes = classNames(styles.inputText, className);

  return(
    <div style={{ width: width, height: height }}>
      <input type="password" 
      placeholder={placeholder} 
      value={value} 
      onChange={e => setValue(e.target.value)} 
      className={classes}
      />
    </div>
  )
}