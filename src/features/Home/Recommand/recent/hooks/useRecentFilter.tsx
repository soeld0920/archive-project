//Resent 컴포넌트에서 사용할 filter 상태 관리 훅
//기존 filter과의 차이는 tag 필드의 추가 뿐임.

import { useState } from "react";
import type { MainCategory, SubCategory } from "shared/types/category";
import type { Filter_DataRange } from "shared/types/Filter";
import type { ExtendedFilter } from "../types/ExtendedFilter";

export default function useRecentFilter(){
  const [filter, setFilter] = useState<ExtendedFilter>({});

  const setFilterMainCategory = (mainCategory: MainCategory | undefined) => {
    setFilter((prevFilter) => ({...prevFilter, mainCategory : mainCategory ?? undefined}));
  };

  const setFilterSubCategory = (subCategory: SubCategory | undefined) => {
    setFilter((prevFilter) => ({...prevFilter, subCategory : subCategory ?? undefined}));
  };

  const setFilterDateRange = (dateRange: Filter_DataRange | undefined) => {
    setFilter((prevFilter) => ({...prevFilter, dateRange : dateRange ?? undefined}));
  };

  const setFilterTag = (tag: string[] | undefined) => {
    setFilter((prevFilter) => ({...prevFilter, tag : tag ?? undefined}));
  };

  return {setFilterMainCategory, setFilterSubCategory, setFilterDateRange, setFilterTag, filter} as const;
}

