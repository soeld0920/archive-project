import { useRef, type RefObject } from "react";
import { useEventListener } from "usehooks-ts";
import { useIsSelectCategoryOpenStore } from "../store/useSelectorOpenStore";

//카테고리 오픈 여부를 관리하는 훅
export function useCloseSelectCategoryByMouseleave(){
  const {closeSelectCategory} = useIsSelectCategoryOpenStore();

  //해당 컴포넌트 전 영역을 ref로 담고, ref를 넘어가면 즉시 닫기.
  const containerRef = useRef<HTMLDivElement>(null);
  useEventListener("mouseleave", () => {
    closeSelectCategory();
  }, containerRef as RefObject<HTMLDivElement>);

  return {containerRef}
}