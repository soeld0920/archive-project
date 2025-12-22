/*
  Dropdown 컴포넌트
  selct 태그를 구현
*/

import classNames from "classnames";
import { useEffect, useState } from "react";
import styles from "shared/styles/shared-components/Dropdown.module.css";
import { FaAngleDown } from "react-icons/fa6";

type DropdownProps = {
  options: any[];
  value: any | undefined;
  onChange: (value: any) => void;
  label: string;
  toString?: (value: any) => string;
  className?: string;
  width?: string;
  height?: string;
  disabled?: boolean;
}

export default function Dropdown({options, value, onChange, label, toString, className, width, height, disabled} : DropdownProps){
  const dropdownClasses = classNames(styles.dropdown, className);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownButtonClasses = classNames(styles.dropdownButton, isOpen ? styles.dropdownButtonActive : "", disabled ? styles.dropdownButtonDisabled : "");
  const dropdownListClasses = classNames(styles.dropdownList, isOpen ? styles.dropdownListActive : "", disabled ? styles.dropdownListDisabled : "");
  
  const handleChange = (option: string) => {
    onChange(option);
    setIsOpen(false);
  }

  useEffect(() => {
    if(disabled) setIsOpen(false);
  }, [disabled]);
  
  return(
    <label className={dropdownClasses} style={{ width: width, height: height }}>
      <button type="button" onClick={() => setIsOpen(!isOpen)} className={dropdownButtonClasses} disabled={disabled}>
        {label ? label : toString ? toString(value) : value}
        <FaAngleDown/>
      </button>
      <ul className={dropdownListClasses}>
        {
          options.map((option, index) => (
            <li key={index} className={classNames(styles.dropdownListItem, option === value ? styles.dropdownListItemActive : "")}>
              <button type="button" onClick={() => handleChange(option)} className={styles.dropdownListItemButton} disabled={disabled}>
                {toString ? toString(option) : option}
              </button>
            </li>
          ))}
      </ul>
    </label>
  );
}
