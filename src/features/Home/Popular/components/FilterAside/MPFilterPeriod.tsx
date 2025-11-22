import { useState, useCallback } from "react";
import styles from "styles/modules/Main/Popular.module.css";

type PeriodOption = "7일" | "1달" | "3달" | "6달" | "1년";

type MPFilterPeriodProps = {
  selectedPeriod: PeriodOption | null;
  onPeriodSelect: (period: PeriodOption) => void;
}

const periodOptions: PeriodOption[] = ["7일", "1달", "3달", "6달", "1년"];

export default function MPFilterPeriod({
  selectedPeriod,
  onPeriodSelect,
}: MPFilterPeriodProps) {
  const [openPeriod, setOpenPeriod] = useState(false);

  const handlePeriodSelect = useCallback((period: PeriodOption) => {
    onPeriodSelect(period);
    setOpenPeriod(false);
  }, [onPeriodSelect]);

  const togglePeriod = useCallback(() => {
    setOpenPeriod(prev => !prev);
  }, []);

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

