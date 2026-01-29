//메인 카테고리를 선택하는 훅

import { useRef } from "react";
import { useEventListener } from "usehooks-ts";
import { useMainCategorySelectorStore } from "../store/useMainCategorySeletorStore";

export function useCategorySelectorKeyboardEvnet(){
  const {nextMainCategoryIndex, prevMainCategoryIndex} = useMainCategorySelectorStore();
  const mainCategorySelector = useRef<HTMLDivElement>(null);

  //TODO : 방향키로 이동하는 함수
  useEventListener("keydown", (event) => {
    if(event.key === "ArrowDown"){
      nextMainCategoryIndex();
    }
    else if(event.key === "ArrowUp"){
      prevMainCategoryIndex();
    }
  }, mainCategorySelector as React.RefObject<HTMLDivElement>);

  return {mainCategorySelector} as const;
}