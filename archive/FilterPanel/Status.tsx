import { Slider } from "antd";
import { useFilterContent } from "features/Search/context/FilterContent";
import styles from "features/Search/Search.module.css";
import { GREAT_RANGE_STEPS, VIEW_RANGE_STEPS } from "features/Search/types/searchFilter";
import millify from "millify";
import { useState } from "react";

export default function StatusFilterPanel(){
  const {filterState, setViewRange, setGreatRange, toggleView, toggleGreat} = useFilterContent();
  const [viewIdxRange, setViewIdxRange] = useState<[number, number]>([0, VIEW_RANGE_STEPS.length - 1]);
  const [greatIdxRange, setGreatIdxRange] = useState<[number, number]>([0, GREAT_RANGE_STEPS.length - 1]);
    
  const onViewChange = (values: [number, number]) => {
    setViewIdxRange(values);
    setViewRange({min : VIEW_RANGE_STEPS[values[0]], max : VIEW_RANGE_STEPS[values[1]]});
  };

  const onGreatChange = (values: [number, number]) => {
    setGreatIdxRange(values);
    setGreatRange({min : GREAT_RANGE_STEPS[values[0]], max : GREAT_RANGE_STEPS[values[1]]});
  };

  return (
    <li>
      <fieldset>
        <legend className="sr-only">지표 필터</legend>

        {/* 조회수 */}
        <label className={styles.filterOption}>
          <input
            type="checkbox"
            checked={filterState.viewEnabled}
            onChange={e => toggleView(e.currentTarget.checked)}
          />
          <p>조회수 필터</p>
        </label>
        <Slider
          range
          disabled={!filterState.viewEnabled}
          min={0}
          max={VIEW_RANGE_STEPS.length - 1}
          value={viewIdxRange}
          onChange={onViewChange as any} // antd 타입이 느슨해서 캐스팅
          tooltip={{
            formatter: (val?: number) =>
              val == null ? "" : `${millify(VIEW_RANGE_STEPS[val])} 회`,
          }}
        />

        {/* 좋아요 */}
        <label className={styles.filterOption}>
          <input
            type="checkbox"
            checked={filterState.greatEnabled}
            onChange={e => toggleGreat(e.currentTarget.checked)}
          />
          <p>좋아요 필터</p>
        </label>
        <Slider
          range
          disabled={!filterState.greatEnabled}
          min={0}
          max={GREAT_RANGE_STEPS.length - 1}
          value={greatIdxRange}
          onChange={onGreatChange as any}
          tooltip={{
            formatter: (val?: number) =>
              val == null ? "" : `${millify(GREAT_RANGE_STEPS[val])} 개`,
          }}
        />
      </fieldset>
    </li>
  );
}