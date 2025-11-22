import { DatePreset } from "features/Search/types/searchFilter";
import styles from "features/Search/Search.module.css";
import { useState } from "react";
import { useFilterContent } from "features/Search/context/FilterContent";

const DatePresetLabel = {
  "7d" : "최근 7일 이내",
  "1m" : "최근 1개월 이내",
  "6m" : "최근 6개월 이내",
  "1y" : "최근 1년 이내",
  "3y" : "최근 3년 이내",
  "custom" : "직접 설정",
  "all" : "모두보기",
}

const newDataPreset : DatePreset[] = ["all","7d", "1m", "6m", "1y", "3y","custom"];

export default function DateFilterPanel() {
  const {filterState, setDuring, setDateRange} = useFilterContent();
  const onPreset = (date : DatePreset) => setDuring(date);
  const [newDateRange, setNewDateRange] = useState<{from: string, to: string}>({from: "", to: ""});

  return (
    <li>
      <fieldset>
        <legend className="sr-only">작성 기간</legend>

        {newDataPreset.map(date => (
          <label key={date} className={styles.filterOption}>
            <input
              type="radio"
              name="during"
              value={date}
              onChange={() => onPreset(date)}
              checked={filterState.during === date}
            />
            <p>{DatePresetLabel[date]}</p>
          </label>
        ))}

        <div className={styles.rangeRow}>
          <input
            type="date"
            value={newDateRange.from}
            onChange={e => {
              setNewDateRange({...newDateRange, from: e.currentTarget.value});
              setDateRange(newDateRange);
            }}
            disabled={filterState.during !== "custom"}
          />
          <span>~</span>
          <input
            type="date"
            value={newDateRange.to}
            onChange={e => {
              setNewDateRange({...newDateRange, to: e.currentTarget.value});
              setDateRange(newDateRange);
            }}
            disabled={filterState.during !== "custom"}
          />
        </div>
      </fieldset>
    </li>
  );
}