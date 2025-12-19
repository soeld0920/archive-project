/*
  Dropdown 컴포넌트
  selct 태그를 구현
*/

import classNames from "classnames";
import { useState } from "react";
import styles from "shared/styles/shared-components/Dropdown.module.css";
import { FaAngleDown } from "react-icons/fa6";

type DropdownProps = {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  className?: string;
  width?: string;
  height?: string;
}

export default function Dropdown({options, value, onChange, label, className, width, height} : DropdownProps){
  const dropdownClasses = classNames(styles.dropdown, className);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownButtonClasses = classNames(styles.dropdownButton, isOpen ? styles.dropdownButtonActive : "");
  const dropdownListClasses = classNames(styles.dropdownList, isOpen ? styles.dropdownListActive : "");
  
  const handleChange = (option: string) => {
    onChange(option);
    setIsOpen(false);
  }
  
  return(
    <label className={dropdownClasses} style={{ width: width, height: height }}>
      <button type="button" onClick={() => setIsOpen(!isOpen)} className={dropdownButtonClasses}>
        {label ? label : value}
        <FaAngleDown/>
      </button>
      <ul className={dropdownListClasses}>
        {
          options.map((option, index) => (
            <li key={index} className={classNames(styles.dropdownListItem, option === value ? styles.dropdownListItemActive : "")}>
              <button type="button" onClick={() => handleChange(option)} className={styles.dropdownListItemButton}>
                {option}
              </button>
            </li>
          ))}
      </ul>
    </label>
  );
}
