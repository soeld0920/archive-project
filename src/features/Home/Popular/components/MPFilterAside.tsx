import { useState, useCallback, useEffect, useRef } from "react";
import { RiResetLeftFill } from "react-icons/ri";
import { type MainCategory, type SubCategory } from "shared/types/category";
import styles from "styles/modules/Main/Popular.module.css";
import MPFilterCategory from "./FilterAside/MPFilterCategory";
import MPFilterPeriod from "./FilterAside/MPFilterPeriod";
import { useFilterStateContext } from "../content/filterState";
import { useShowFilterContext } from "../content/showFilter";

type PeriodOption = "7일" | "1달" | "3달" | "6달" | "1년";

type MPHiddenProps = {
  className : string;
}

export default function MPFilterAside({className} : MPHiddenProps){
  const [criteria,setCriteria] = useFilterStateContext();
  const [showFilter, setShowFilter] = useShowFilterContext();
  const [selectedMainCategory, setSelectedMainCategory] = useState<MainCategory | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodOption | null>(null);
  const asideRef = useRef<HTMLElement>(null);

  // 외부 클릭 감지
  useEffect(() => {
    if (!showFilter) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (asideRef.current && !asideRef.current.contains(event.target as Node)) {
        setShowFilter(false);
      }
    };

    // 이벤트 리스너는 약간의 지연 후 추가하여 현재 클릭 이벤트가 처리되지 않도록 함
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFilter, setShowFilter]);

  const handleMainCategorySelect = useCallback((category: MainCategory) => {
    setSelectedMainCategory(category);
    setSelectedSubCategory(null);
    setCriteria({...criteria, mainCategory : category});
  }, [criteria, setCriteria]);

  const handleSubCategorySelect = useCallback((subCat: SubCategory) => {
    setSelectedSubCategory(subCat);
    setCriteria({...criteria, subCategory : subCat});
  }, [criteria, setCriteria]);

  const handlePeriodSelect = useCallback((period: PeriodOption) => {
    setSelectedPeriod(period);
    setCriteria({...criteria, dateRange : {from : new Date().toISOString(), to : new Date(new Date().setDate(new Date().getDate() + 7)).toISOString()}});
  }, [criteria, setCriteria]);

  const handleResetFilter = useCallback(() => {
    setSelectedMainCategory(null);
    setSelectedSubCategory(null);
    setSelectedPeriod(null);
    setCriteria(undefined);
    setShowFilter(false);
  }, [setCriteria, setShowFilter]);

  return(
    <aside ref={asideRef} className={className}>
      <div className={styles.filterMenu}>
        <MPFilterCategory
          selectedMainCategory={selectedMainCategory}
          selectedSubCategory={selectedSubCategory}
          onMainCategorySelect={handleMainCategorySelect}
          onSubCategorySelect={handleSubCategorySelect}
        />
        <MPFilterPeriod
          selectedPeriod={selectedPeriod}
          onPeriodSelect={handlePeriodSelect}
        />
        <button className={styles.filterReset} onClick={handleResetFilter}>
          초기화 <RiResetLeftFill />
        </button>
      </div>
    </aside>
  )
}