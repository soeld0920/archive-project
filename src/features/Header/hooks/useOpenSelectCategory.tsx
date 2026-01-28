import { useRef, useState, type RefObject } from "react";
import { useEventListener } from "usehooks-ts";
import { useCategoryContext } from "../context/categoryContext";

//카테고리 오픈 여부를 관리하는 훅
export function useOpenSelectCategory(){
  const [isSelectCategoryOpen, setIsSelectCategoryOpen] = useState(false);
  const [_, dispatchCategory] = useCategoryContext();
  //카테고리 열기
  const openSelectCategory = () => {
    dispatchCategory({type : "RESET"});
    setIsSelectCategoryOpen(true);
  }

  //카테고리 닫기
  const closeSelectCategory = () => {
    setIsSelectCategoryOpen(false);
  }

  //해당 컴포넌트 전 영역을 ref로 담고, ref를 넘어가면 즉시 닫기.
  const containerRef = useRef<HTMLDivElement>(null);
  useEventListener("mouseleave", () => {
    closeSelectCategory();
  }, containerRef as RefObject<HTMLDivElement>);

  return {isSelectCategoryOpen, openSelectCategory, closeSelectCategory, containerRef}
}