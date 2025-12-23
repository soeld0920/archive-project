export const FormType = ["all", "snippet", "series"] as const;
export type FormType = (typeof FormType)[number];
export const DatePreset = ["7d", "1m", "6m", "1y", "3y", "custom", "all"] as const;
export type DatePreset = (typeof DatePreset)[number];
export const VIEW_RANGE_STEPS = [0,100,500,1000,5000,10000,50000,100000,500000,1000000]
export const GREAT_RANGE_STEPS = [0,10,50,100,200,400,750,1000,1500,2000,3000,5000,10000,25000]

export type SearchFilterState = {
  byAuthor: boolean;
  author: string;
  formType: FormType;
  during: DatePreset;
  dateRange? : {
    from: string;    // YYYY-MM-DD
    to: string;
  }
  viewEnabled: boolean;
  viewRange? : {
    min: number;
    max: number;
  }
  greatEnabled: boolean;
  greatRange? : {
    min: number;
    max: number;
  }
};

export type SearchFilterAction =
| { type: "TOGGLE_BY_AUTHOR"; payload: boolean }
| { type: "SET_AUTHOR"; payload: string }
| { type: "SET_FORM_TYPE"; payload: FormType }
| { type: "SET_DURING"; payload: DatePreset }
| { type: "SET_DATE_RANGE"; payload: { from?: string; to?: string } }
| { type: "SET_VIEW_ENABLED"; payload: boolean }
| { type: "SET_VIEW_RANGE"; payload: { min?: number; max?: number } }
| { type: "SET_GREAT_ENABLED"; payload: boolean }
| { type: "SET_GREAT_RANGE"; payload: { min?: number; max?: number } }
| { type: "RESET" }
| { type: "HYDRATE"; payload: Partial<SearchFilterState> };

export const initialFilterState : SearchFilterState = {
  byAuthor : false,
  author : "",
  formType : "all",
  during : "all",
  viewEnabled : false,
  greatEnabled : false
}