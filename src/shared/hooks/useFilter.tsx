//filter 타입을 쉽게 관리하기 위한 훅
//기존에는 객체라 값 변경을 인지하지 못했음.
//하지만 여기서는 각각의 필드에 useState를 만들고, 이를 제공함

import { useState } from "react";
import type { MainCategory, SubCategory } from "shared/types/entity/Category";
import type { Filter, Filter_DataRange } from "shared/types/Filter";

export default function useFilter(){
  const [filter, setFilter] = useState<Filter>({});

  const setFilterMainCategory = (mainCategory: MainCategory | undefined) => {
    setFilter((prevFilter) => ({...prevFilter, mainCategory : mainCategory ?? undefined}));
  };

  const setFilterSubCategory = (subCategory: SubCategory | undefined) => {
    setFilter((prevFilter) => ({...prevFilter, subCategory : subCategory ?? undefined}));
  };

  const setFilterDateRange = (dateRange: Filter_DataRange | undefined) => {
    setFilter((prevFilter) => ({...prevFilter, dateRange : dateRange ?? undefined}));
  };

  return {setFilterMainCategory, setFilterSubCategory, setFilterDateRange, filter} as const;
}