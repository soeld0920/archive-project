export const SORT_OPTION = ["정확도순", "최신순"] as const;

export type SearchSortStandard = typeof SORT_OPTION[number];
