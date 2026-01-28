//메인 카테고리를 선택하는 훅

import { useEffect, useRef, useState } from "react";
import type { MainCategory } from "shared/types/MainCategory";
import { useEventListener } from "usehooks-ts";

export function useMainCategorySelector(){
  const [selectedMainCategory, setSelectedMainCategory] = useState<MainCategory | undefined>(undefined);
  const [selectedMainCategoryIndex, setSelectedMainCategoryIndex] = useState<number | undefined>(undefined);
  const [mainCategoryList, setMainCategoryList] = useState<MainCategory[]>([]);
  const mainCategorySelector = useRef<HTMLDivElement>(null);

  //index가 바뀌면 즉시 selectedMainCategory가 변경되도록 함
  useEffect(() => {
    if(selectedMainCategoryIndex !== undefined){
      setSelectedMainCategory(mainCategoryList[selectedMainCategoryIndex]);
    }
  }, [selectedMainCategoryIndex]);

  //TODO : 방향키로 이동하는 함수
  useEventListener("keydown", (event) => {
    if(event.key === "ArrowDown"){
      setSelectedMainCategoryIndex((prev) => (prev !== undefined ? (prev + 1) % mainCategoryList.length : 0));
    }
    else if(event.key === "ArrowUp"){
      setSelectedMainCategoryIndex((prev) => (prev !== undefined ? (prev - 1 + mainCategoryList.length) % mainCategoryList.length : mainCategoryList.length - 1));
    }
  }, mainCategorySelector as React.RefObject<HTMLDivElement>);

  return {selectedMainCategory, selectedMainCategoryIndex, setSelectedMainCategoryIndex, setMainCategoryList, mainCategorySelector} as const;
}