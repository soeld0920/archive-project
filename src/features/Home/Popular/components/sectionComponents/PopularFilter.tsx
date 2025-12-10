//기존에 복잡한 PopularSectionComponent에서 filter 관련 부분을 분리한 컴포넌트

import PopularFilterAside from "../FilterAside";
import PopularCriteriaButton from "../PopularCriteriaButton";
import classNames from "classnames";
import styles from "features/Home/Popular/Popular.module.css";
import { useShowFilterContext } from "../../context/showFilter";
import { useEffect, useRef } from "react";
import handleClickOutside from "shared/lib/utils/handleClickOutside";

export default function PopularFilter(){
  const [showFilter, setShowFilter] = useShowFilterContext();
  const popularHiddenClass = classNames({[styles.hiddenWrapper] : true,[styles.shown] : showFilter})
  const asideRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!showFilter) return;

    const handleClick = handleClickOutside(asideRef, buttonRef, setShowFilter);
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showFilter, setShowFilter]);

  return(
    <div>
      <PopularCriteriaButton ref={buttonRef}/>
      <PopularFilterAside ref={asideRef} className={popularHiddenClass}/>
    </div>
  )
}