/*
  Dropdown 컴포넌트
  selct 태그를 구현
*/

import classNames from "classnames";
import { useEffect, useState } from "react";
import styles from "shared/styles/shared-components/Dropdown.module.css";
import { FaAngleDown } from "react-icons/fa6";

type DropdownProps = {
  // 드롭다운 옵션 리스트
  options: any[];

  // 드롭다운 옵션 리스트 설정 함수. 열렸을때만 실행됨.
  setOptions? : () => Promise<any[]>;

  // 드롭다운 선택 값
  value: any | undefined;

  // 드롭다운 선택 값 변경 함수
  onChange: (value: any) => void;

  // 드롭다운 라벨
  label: string;

  // 각 option을 문자열로 보여주기 위한 함수
  toString?: (value: any) => string;

  // 드롭다운 컴포넌트 클래스
  className?: string;

  // 드롭다운 컴포넌트 너비
  width?: string;

  // 드롭다운 컴포넌트 높이
  height?: string;

  // 드롭다운 컴포넌트 비활성화 여부
  disabled?: boolean;

  //value와 option이 같은지를 반환하는 함수
  isSame? : (value: any, option: any) => boolean;

  //border 여부
  border?: boolean;

  //아래 화살표 여부
  arrow?: boolean;
}

export default function Dropdown({options, setOptions, value, onChange, label, toString, className, width, height, disabled, isSame, border = true, arrow = true} : DropdownProps){
  const dropdownClasses = classNames(styles.dropdown);
  const [dropdownOptions, setDropdownOptions] = useState(options);
  const [isOpen, setIsOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(disabled);
  const dropdownButtonClasses = classNames(styles.dropdownButton, isOpen ? styles.dropdownButtonActive : "", isDisabled ? styles.dropdownButtonDisabled : "", className, border ? styles.dropdownButtonBorder : "");
  const dropdownListClasses = classNames(styles.dropdownList, isOpen ? styles.dropdownListActive : "", isDisabled ? styles.dropdownListDisabled : "");
  
  useEffect(() => {
    setIsDisabled(disabled);
  }, [disabled]);

  useEffect(() => {
    if(setOptions){
      const fetchOptions = async () => {
        const newOptions = await setOptions();
        if(newOptions == null || newOptions.length === 0){
          setIsDisabled(true);
        }
      }
      fetchOptions();    
    }
  }, []);

  const handleChange = (option: string) => {
    onChange(option);
    setIsOpen(false);
  }

  useEffect(() => {
    if(isDisabled) setIsOpen(false);
  }, [isDisabled]);

  useEffect(() => {
    if(setOptions && isOpen) {
      const fetchOptions = async () => {
        const newOptions = await setOptions();
        setDropdownOptions(newOptions);
      }
      fetchOptions();
    }
  }, [isOpen]);
  
  return(
    <label className={dropdownClasses} style={{ width: width, height: height }}>
      <button type="button" onClick={() => setIsOpen(!isOpen)} className={dropdownButtonClasses} disabled={isDisabled}>
        {label ? label : toString ? toString(value) : value}
        {arrow ? <FaAngleDown/> : null}
      </button>
      <ul className={dropdownListClasses}>
        {
          dropdownOptions.map((option, index) => (
            <li key={index} className={classNames(styles.dropdownListItem, (isSame ? isSame(value, option) : value === option) ? styles.dropdownListItemActive : "")}>
              <button type="button" onClick={() => handleChange(option)} className={styles.dropdownListItemButton} disabled={isDisabled}>
                <span className={styles.dropdownListItemButtonText}>{toString ? toString(option) : option as string}</span>
              </button>
            </li>
          ))}
      </ul>
    </label>
  );
}
