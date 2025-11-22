import { FaFilter } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useFilterStateContext } from "./context/filterState";
import styles from "styles/modules/Main/Recommand.module.css";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { MAIN_SET, SUB_MAP, type MainCategory, type SubCategory } from "shared/types/category";

export default function MRFilter(){
  const [filter, setFilter] = useFilterStateContext();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const [main, setMain] = useState<MainCategory | undefined>(filter?.mainCategory);
  const [sub, setSub] = useState<SubCategory | undefined>(filter?.subCategory);
  // tags: comma separated input -> string[]
  const [tags, setTags] = useState<string>("");

  // 외부 클릭 시 패널 닫기
  useEffect(() => {
    function handleClick(e: MouseEvent){
      if(!open) return;
      const el = wrapperRef.current;
      if(!el) return;
      if(e.target instanceof Node && !el.contains(e.target)){
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  // main 변경 시 sub 초기화
  useEffect(() => {
    setSub(undefined);
  }, [main]);

  // tag 변경시 filter 상태 업데이트. ","로 구분.
  useEffect(() => {
    const tagArray = tags.split(',').map(t => t.trim()).filter(t => t);
    setFilter(prev => ({
      ...prev,
      mainCategory: main,
      subCategory: sub,
      tag: tagArray.length > 0 ? tagArray : undefined,
    }));
  }, [main, sub, tags, setFilter]);

  const mainOptions = Array.from(MAIN_SET.values());
  const subOptions = main ? Array.from(SUB_MAP.get(main) ?? []) : [];

  return(
    <div className={styles.MRfilterWrapper} ref={wrapperRef}>
      {/* 1: 부모 버튼 */}
      <button
        className={classNames(styles.MRfilterButton, { [styles.open]: open })}
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-controls="mr-filter-panel"
      >
        <FaFilter />
      </button>

      {/* 2: 자식 필터 패널 */}
      <div
        id="mr-filter-panel"
        className={classNames(styles.MRfilterPanel, { [styles.MRopen]: open })}
      >
        <div className={styles.MRfilterRow}>
          <label className={styles.MRlabel}>메인 카테고리</label>
          <select
            value={main ?? ""}
            onChange={(e) => setMain((e.target.value || undefined) as MainCategory | undefined)}
            className={styles.MRselect}
          >
            <option value="">선택 안함</option>
            {mainOptions.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <div className={styles.MRfilterRow}>
          <label className={styles.MRlabel}>서브 카테고리</label>
          <select
            value={sub ?? ""}
            onChange={(e) => setSub((e.target.value || undefined) as SubCategory | undefined)}
            disabled={!main}
            className={styles.MRselect}
          >
            <option value="">선택 안함</option>
            {subOptions.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* 태그 검색 */}
        <div className={styles.MRfilterRow}>
          <label className={styles.MRlabel}>태그</label>
          <input 
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder=",로 태그 분류"
            className={styles.MRinput}
          />
        </div>

        {/* 닫기 */}
        <div className={styles.MRfilterActions}>
          <button className={styles.MRcloseButton} onClick={() => setOpen(false)} aria-label="닫기">
            <IoClose />
          </button>
        </div>

      </div>
    </div>
  )
}