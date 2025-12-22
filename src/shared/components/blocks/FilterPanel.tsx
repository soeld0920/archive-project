/*
  필터를 설정하는 공용 컴포넌트
  필터 종류에 따라 컴포넌트를 추가할 수 있도록 함
*/

import type { Filter } from "shared/types/Filter";
import classNames from "classnames";
import styles from "shared/styles/shared-components/FilterPanel.module.css";
import { FaFilter } from "react-icons/fa";
import { useEffect, useRef } from "react";
import handleClickOutside from "shared/lib/utils/handleClickOutside";
import { IoClose } from "react-icons/io5";

type FilterOption = "category" | "date" | "author" | "form" | "status" | "tag";

type FilterPanelProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  filterOptions : FilterOption[];
  filter: Filter;
  setFilter: (filter: Filter) => void;
}

export default function FilterPanel({open, setOpen, filterOptions, filter, setFilter}: FilterPanelProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  
  // 외부 클릭 시 패널 닫기
  useEffect(() => {
    if (!open) return;
    
    const handleClick = handleClickOutside(panelRef, buttonRef, setOpen);
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return(
    <div>
      {/* 1: 부모 버튼 */}
      <button
        ref={buttonRef}
        className={classNames(styles.filterButton, { [styles.open]: open })}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="recent-filter-panel"
      >
        <FaFilter />
      </button>

      {/* 2: 자식 필터 패널 */}
      <div
        ref={panelRef}
        className={classNames(styles.filterPanel, { [styles.open]: open })}
      >

        {/* 닫기 */}
        <div className={styles.filterActions}>
          <button className={styles.closeButton} onClick={() => setOpen(false)} aria-label="닫기">
            <IoClose />
          </button>
        </div>

      </div>
    </div>
  )
}

type FilterStatePanelProps = {
  filter: Filter;
  setFilter: (filter: Filter) => void;
}

function FilterCategoryPanel({filter, setFilter}: FilterStatePanelProps) {
  if(filter.mainCategory == undefined || filter.subCategory == undefined) {
    return null;
  }



  return <div>FilterCategoryPanel</div>;
}

function FilterDatePanel({filter, setFilter}: FilterStatePanelProps) {
  if(filter.dateRange == undefined) {
    return null;
  }

  return <div>FilterDatePanel</div>;
}

function FilterAuthorPanel({filter, setFilter}: FilterStatePanelProps) {
  if(filter.author == undefined) {
    return null;
  }

  return <div>FilterAuthorPanel</div>;
}

function FilterFormPanel({filter, setFilter}: FilterStatePanelProps) {
  if(filter.form == undefined) {
    return null;
  }

  return <div>FilterFormPanel</div>;
}

function FilterStatusPanel({filter, setFilter}: FilterStatePanelProps) {
  if(filter.status == undefined) {
    return null;
  }

  return <div>FilterStatusPanel</div>;
}

function FilterTagPanel({filter, setFilter}: FilterStatePanelProps) {
  if(filter.tag == undefined) {
    return null;
  }

  return <div>FilterTagPanel</div>;
}