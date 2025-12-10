import { FaFilter } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import styles from "../../Recent.module.css";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import handleClickOutside from "shared/lib/utils/handleClickOutside";
import MainCategoryFilter from "./MainCategoryFilter";
import SubCategoryFilter from "./SubCategoryFilter";
import TagFilter from "./TagFilter";

export default function RecentFilter(){
  const [open, setOpen] = useState(false);
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
    <div className={styles.filterWrapper} ref={panelRef}>
      {/* 1: 부모 버튼 */}
      <button
        ref={buttonRef}
        className={classNames(styles.filterButton, { [styles.open]: open })}
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-controls="recent-filter-panel"
      >
        <FaFilter />
      </button>

      {/* 2: 자식 필터 패널 */}
      <div
        id="recent-filter-panel"
        className={classNames(styles.filterPanel, { [styles.open]: open })}
      >
        <MainCategoryFilter />
        <SubCategoryFilter />
        <TagFilter />

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

