/*
  Input type = checkbox 컴포넌트
  span을 통해 체크박스 스타일을 준 형식
*/

import classNames from "classnames";
import styles from "shared/styles/shared-components/CheckBox.module.css";
import { FaCheck } from "react-icons/fa6";

type CheckBoxProps = {
  value: boolean;
  setValue: (value: boolean) => void;
  size?: string;
  className?: string;
  children?: string;
} 

export default function CheckBox({value, setValue, size = "20px", className, children} : CheckBoxProps){
  const classes = classNames(styles.checkBoxSpan, value ? styles.checkBoxSpanActive : "", className);

  return(
    <label style={{ height: size, display : "inline-block"}}>
      <input type="checkbox" className={styles.checkBoxInput} checked={value} onChange={e => setValue(e.target.checked)}/>
      <span className={classes}><FaCheck/></span>
      <p>{children}</p>
    </label>
  )
}