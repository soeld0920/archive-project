export const SORT_OPTION = ["정확도순", "최신순", "오래된순","조회수 높은 순", "조회수 낮은 순", "좋아요 많은 순", "좋아요 적은 순", "가나다순"] as const;

export type SearchSortStandard = typeof SORT_OPTION[number];
