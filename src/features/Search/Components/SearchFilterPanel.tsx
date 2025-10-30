import { useCallback, useMemo } from "react";
import { Slider } from "antd";
import millify from "millify";
import styles from "styles/modules/Search.module.css";

import {
  GREAT_RANGE_STEPS,
  VIEW_RANGE_STEPS,
  type DatePreset,
  type FormType,
  type SearchFilterAction,
  type SearchFilterState,
} from "../types/searchFilter.types";

type SearchFilterPanelProps = {
  filterState: SearchFilterState;
  filterDispatch: React.Dispatch<SearchFilterAction>;
};

export default function SearchFilterPanel({
  filterState,
  filterDispatch,
}: SearchFilterPanelProps) {
  // ─────────────────────────────────────────────────────────────
  // 헬퍼: 슬라이더 인덱스 <-> 값 변환 (디버깅 편의)
  // ─────────────────────────────────────────────────────────────

  /*step의 value에 해당하는 idx를 반환합니다. 못찾으면 0을 반환합니다.*/
  const idxFromStep = (steps: number[], value: number | undefined, fallback = 0) =>
    value == null ? fallback : Math.max(0, steps.findIndex((v) => v === value));

  //steps 길이 내의 idx인 경우 idx를, 아닐 경우 0 또는 끝 부분을 반환합니다.
  const clampIdx = (steps: number[], idx: number | undefined, fallback: number) =>
    idx == null ? fallback : Math.min(Math.max(idx, 0), steps.length - 1);

  // 현재 상태 → 인덱스로 변환해 UI 바인딩
  const viewIdxRange = useMemo<[number, number]>(() => {
    const min = idxFromStep(VIEW_RANGE_STEPS, filterState.viewRange?.min, 0);
    const max = idxFromStep(VIEW_RANGE_STEPS, filterState.viewRange?.max, VIEW_RANGE_STEPS.length - 1);
    return [min, max];
  }, [filterState.viewRange]);

  const greatIdxRange = useMemo<[number, number]>(() => {
    const min = idxFromStep(GREAT_RANGE_STEPS, filterState.greatRange?.min, 0);
    const max = idxFromStep(GREAT_RANGE_STEPS, filterState.greatRange?.max, GREAT_RANGE_STEPS.length - 1);
    return [min, max];
  }, [filterState.greatRange]);

  // ─────────────────────────────────────────────────────────────
  // 액션 바인더
  // ─────────────────────────────────────────────────────────────
  const authorFilter = {
    setEnabled: (enabled: boolean) => {
      // 켰을 땐 유지, 껐을 땐 값 제거가 자연스러우면 아래 한 줄 유지
      if (!enabled) filterDispatch({ type: "SET_AUTHOR", payload: "" });
      filterDispatch({ type: "TOGGLE_BY_AUTHOR", payload: enabled });
    },
    setValue: (value: string) => filterDispatch({ type: "SET_AUTHOR", payload: value }),
  };

  const formFilter = {
    setType: (value: FormType) => filterDispatch({ type: "SET_FORM_TYPE", payload: value }),
  };

  const dateFilter = {
    setPreset: (preset: DatePreset) => {
      filterDispatch({ type: "SET_DURING", payload: preset });
      // preset 변경 시 커스텀 값 초기화가 필요하면 아래 활성화
    },
    setRange: (value: string, key: "from" | "to") => {
      if (filterState.during !== "custom") return;
      const next = { ...filterState.dateRange, [key]: value || undefined };
      filterDispatch({ type: "SET_DATE_RANGE", payload: next });
    },
  };

  const viewFilter = {
    setEnabled: (enabled: boolean) => {
      filterDispatch({ type: "SET_VIEW_ENABLED", payload: enabled });
      // 기본 범위로 초기화하고 싶을 때:
      if (enabled && !filterState.viewRange) {
        filterDispatch({
          type: "SET_VIEW_RANGE",
          payload: { min: VIEW_RANGE_STEPS[0], max: VIEW_RANGE_STEPS.at(-1)! },
        });
      }
    },
    setIdxRange: ([minIdx, maxIdx]: [number, number]) => {
      const min = VIEW_RANGE_STEPS[clampIdx(VIEW_RANGE_STEPS, minIdx, 0)];
      const max =
        VIEW_RANGE_STEPS[clampIdx(VIEW_RANGE_STEPS, maxIdx, VIEW_RANGE_STEPS.length - 1)];
      filterDispatch({ type: "SET_VIEW_RANGE", payload: { min, max } });
    },
  };

  const greatFilter = {
    setEnabled: (enabled: boolean) => {
      filterDispatch({ type: "SET_GREAT_ENABLED", payload: enabled });
      if (enabled && !filterState.greatRange) {
        filterDispatch({
          type: "SET_GREAT_RANGE",
          payload: { min: GREAT_RANGE_STEPS[0], max: GREAT_RANGE_STEPS.at(-1)! },
        });
      }
    },
    setIdxRange: ([minIdx, maxIdx]: [number, number]) => {
      const min = GREAT_RANGE_STEPS[clampIdx(GREAT_RANGE_STEPS, minIdx, 0)];
      const max =
        GREAT_RANGE_STEPS[clampIdx(GREAT_RANGE_STEPS, maxIdx, GREAT_RANGE_STEPS.length - 1)];
      filterDispatch({ type: "SET_GREAT_RANGE", payload: { min, max } });
    },
  };

  const resetFilters = useCallback(() => filterDispatch({ type: "RESET" }), [filterDispatch]);

  return (
    <ul className={styles.filterPanel}>
      <AuthorFilterPanel filterState={filterState} authorFilter={authorFilter} />
      <FormFilterPanel filterState={filterState} formFilter={formFilter} />
      <DateFilterPanel filterState={filterState} dateFilter={dateFilter} />
      <MetricFilterPanel
        filterState={filterState}
        viewIdxRange={viewIdxRange}
        viewFilter={viewFilter}
        greatIdxRange={greatIdxRange}
        greatFilter={greatFilter}
      />
      <FilterResetPanel onReset={resetFilters} />
    </ul>
  );
}

// ─────────────────────────────────────────────────────────────
// [작성자]
// ─────────────────────────────────────────────────────────────
type AuthorFilterPanelProps = {
  authorFilter: {
    setEnabled: (value: boolean) => void;
    setValue: (value: string) => void;
  };
  filterState: SearchFilterState;
};

function AuthorFilterPanel({ authorFilter, filterState }: AuthorFilterPanelProps) {
  const id = "byAuthor";
  return (
    <li>
      <fieldset>
        <legend className="sr-only">작성자 필터</legend>
        <label htmlFor={id} className={styles.filterOption}>
          <input
            id={id}
            type="checkbox"
            checked={filterState.byAuthor}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              authorFilter.setEnabled(e.currentTarget.checked)
            }
          />
          <p>작성자명으로 검색</p>
        </label>

        <input
          type="text"
          placeholder="작성자 입력"
          value={filterState.author ?? ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            authorFilter.setValue(e.currentTarget.value)
          }
          disabled={!filterState.byAuthor}
        />
      </fieldset>
    </li>
  );
}

// ─────────────────────────────────────────────────────────────
// [글 종류]
// ─────────────────────────────────────────────────────────────
type FormFilterPanelProps = {
  formFilter: { setType: (value: FormType) => void };
  filterState: SearchFilterState;
};

function FormFilterPanel({ formFilter, filterState }: FormFilterPanelProps) {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    formFilter.setType(e.currentTarget.value as FormType);

  return (
    <li>
      <fieldset>
        <legend className="sr-only">글 종류</legend>
        <label className={styles.filterOption}>
          <input
            type="radio"
            name="formType"
            value="all"
            onChange={onChange}
            checked={filterState.formType === "all"}
          />
          <p>전체</p>
        </label>
        <label className={styles.filterOption}>
          <input
            type="radio"
            name="formType"
            value="snippet"
            onChange={onChange}
            checked={filterState.formType === "snippet"}
          />
          <p>단편</p>
        </label>
        <label className={styles.filterOption}>
          <input
            type="radio"
            name="formType"
            value="series"
            onChange={onChange}
            checked={filterState.formType === "series"}
          />
          <p>시리즈</p>
        </label>
      </fieldset>
    </li>
  );
}

// ─────────────────────────────────────────────────────────────
// [작성 기간]
// ─────────────────────────────────────────────────────────────
type DateFilterPanelProps = {
  dateFilter: {
    setPreset: (value: DatePreset) => void;
    setRange: (value: string, key: "from" | "to") => void;
  };
  filterState: SearchFilterState;
};

function DateFilterPanel({ dateFilter, filterState }: DateFilterPanelProps) {
  const onPreset = (e: React.ChangeEvent<HTMLInputElement>) =>
    dateFilter.setPreset(e.currentTarget.value as DatePreset);

  const isCustom = filterState.during === "custom";
  const fromVal = filterState.dateRange?.from ?? "";
  const toVal = filterState.dateRange?.to ?? "";

  return (
    <li>
      <fieldset>
        <legend className="sr-only">작성 기간</legend>

        {(["all", "7d", "1m", "6m", "1y", "3y", "custom"] as const).map((k) => (
          <label key={k} className={styles.filterOption}>
            <input
              type="radio"
              name="during"
              value={k}
              onChange={onPreset}
              checked={filterState.during === k}
            />
            <p>{labelForPreset(k)}</p>
          </label>
        ))}

        <div className={styles.rangeRow}>
          <input
            type="date"
            value={fromVal}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              dateFilter.setRange(e.currentTarget.value, "from")
            }
            disabled={!isCustom}
          />
          <span>~</span>
          <input
            type="date"
            value={toVal}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              dateFilter.setRange(e.currentTarget.value, "to")
            }
            disabled={!isCustom}
          />
        </div>
      </fieldset>
    </li>
  );
}

function labelForPreset(p: DatePreset) {
  switch (p) {
    case "all":
      return "모두보기";
    case "7d":
      return "최근 7일 이내";
    case "1m":
      return "최근 1달 이내";
    case "6m":
      return "최근 6달 이내";
    case "1y":
      return "최근 1년 이내";
    case "3y":
      return "최근 3년 이내";
    case "custom":
      return "직접 설정";
  }
}

// ─────────────────────────────────────────────────────────────
// [조회수/좋아요]
// ─────────────────────────────────────────────────────────────
type MetricFilterPanelProps = {
  filterState: SearchFilterState;
  viewIdxRange: [number, number];
  viewFilter: {
    setEnabled: (value: boolean) => void;
    setIdxRange: (pair: [number, number]) => void;
  };
  greatIdxRange: [number, number];
  greatFilter: {
    setEnabled: (value: boolean) => void;
    setIdxRange: (pair: [number, number]) => void;
  };
};

function MetricFilterPanel({
  filterState,
  viewIdxRange,
  viewFilter,
  greatIdxRange,
  greatFilter,
}: MetricFilterPanelProps) {
  const onViewChange = (values: [number, number]) => {
    if (!filterState.viewEnabled) return;
    viewFilter.setIdxRange(values);
  };

  const onGreatChange = (values: [number, number]) => {
    if (!filterState.greatEnabled) return;
    greatFilter.setIdxRange(values);
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              viewFilter.setEnabled(e.currentTarget.checked)
            }
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              greatFilter.setEnabled(e.currentTarget.checked)
            }
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

// ─────────────────────────────────────────────────────────────
// [리셋]
// ─────────────────────────────────────────────────────────────
function FilterResetPanel({ onReset }: { onReset: () => void }) {
  return (
    <li style={{ display: "flex", justifyContent: "space-between" }}>
      <button type="button" onClick={onReset} className={`${styles.reloadBtn} navItem`}>
        필터 초기화
      </button>
    </li>
  );
}
