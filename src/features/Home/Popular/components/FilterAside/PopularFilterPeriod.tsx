import { useState } from "react";
import styles from "features/Home/Popular/Popular.module.css";
import type { Filter_DataRange } from "shared/types/Filter";
import { useFilterStateContext } from "../../context/filterState";

type PeriodOption = "7일" | "1달" | "3달" | "6달" | "1년";

const periodOptions: PeriodOption[] = ["7일", "1달", "3달", "6달", "1년"];

export default function PopularFilterPeriod() {
  const [openPeriod, setOpenPeriod] = useState(false);
  const {setFilterDateRange} = useFilterStateContext();
  const {filter} = useFilterStateContext();
  const selectedPeriod = filter.dateRange;

  const handlePeriodSelect =  (period: PeriodOption) => {
    let dateRange : Filter_DataRange | undefined;
    switch(period){
      case "7일":
        dateRange = {from : new Date(new Date().setDate(new Date().getDate() - 7)).toISOString(), to : new Date().toISOString()};
        break;
      case "1달":
        dateRange = {from : new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString(), to : new Date().toISOString()};
        break;
      case "3달":
        dateRange = {from : new Date(new Date().setMonth(new Date().getMonth() - 3)).toISOString(), to : new Date().toISOString()};
        break;
      case "6달":
        dateRange = {from : new Date(new Date().setMonth(new Date().getMonth() - 6)).toISOString(), to : new Date().toISOString()};
        break;
      case "1년":
        dateRange = {from : new Date(new Date().setMonth(new Date().getMonth() - 12)).toISOString(), to : new Date().toISOString()};
        break;
    }
    setFilterDateRange(dateRange);
    setOpenPeriod(false);
  };

  const togglePeriod = () => {
    setOpenPeriod(prev => !prev);
  };

  return (
    <div className={styles.filterPeriod}>
      <button 
        className={styles.filterPeriodTitle}
        onClick={togglePeriod}
      >
        <span>기간{selectedPeriod ? ` : ${selectedPeriod}` : ""}</span>
        <span className={styles.filterIcon}>{openPeriod ? "▼" : "▶"}</span>
      </button>
      
      {openPeriod && (
        <div className={styles.filterPeriodValues}>
          {periodOptions.map((period) => (
            <button
              key={period}
              className={styles.filterPeriodItem}
              onClick={() => handlePeriodSelect(period)}
            >
              {period}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}


