import { useEffect, useRef, useState } from "react";
import { useCategoryContext } from "../context/categoryContext";
import { useOpenPopupContext } from "../context/openPopupContext";
import { categories, MAIN_SET, SUB_MAP, type MainCategory, type SubCategory } from "shared/types/category";
import type { CategoryPopupType } from "../types/CategoryPopupType";
import handleClickOutside from "shared/lib/utils/handleClickOutside";

/* 팝업 상태 관리 훅
  - openPopup false이면 category 초기화.
  - 키보드 방향키로 조작 가능
  - 팝업 외부 클릭 시 닫힘
  - onMainSelect / onSubSelect 함수 생성

  ※ EventListener는 이전 상태를 기억하므로, useRef를 사용하여 최신 상태를 참조해야 함.
*/
export function useCategoryPopup(){
  const [openPopup, setOpenPopup] = useOpenPopupContext();
  const [categoryState, dispatchCategory] = useCategoryContext();
  // 방향키 조작시, 선택된 카테고리를 의미하는 상태
  const [active , setActive] = useState<CategoryPopupType>({categorySection : "none", idx : 0});
  // 팝업 div ref
  const panelRef = useRef<HTMLDivElement>(null);
  // 토글 버튼 ref
  const toggleRef = useRef<HTMLButtonElement>(null);

  // category 초기화
  useEffect(() => {
    if (!openPopup) return;
    dispatchCategory({ type: "RESET" });
    setActive({categorySection : "main", idx : 0});
  }, [openPopup]);
  // ★★★ 키보드 방향키로 조작 가능 ★★★

  // 최신 상태 참조
  const activeRef = useRef(active);
  useEffect(() => { activeRef.current = active; }, [active]);

  // 카테고리 개수 참조
  const countsRef = useRef({ main: MAIN_SET.size, sub: 0 });
  useEffect(() => {
    countsRef.current = {
      ...countsRef.current,
      sub: SUB_MAP.get(categoryState.mainCategory as MainCategory)?.size ?? 0,
    };
  }, [categoryState.mainCategory]);

  //구현
  useEffect(() => {
    //닫히면 무시하고 리스너 제거
    if (!openPopup) return;

    // 키보드 이벤트 핸들러
    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      e.preventDefault();
      const dir = e.key === "ArrowUp" ? -1 : e.key === "ArrowDown" ? 1 : 0;

      // 첫 화살표 키 입력이면 메인 0번으로 이동
      if((e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === "ArrowLeft") 
        && activeRef.current.categorySection === "none"){
        setActive({categorySection : "main", idx : 0});
        return;
      }

      switch (e.key) {

        // Esc -> 닫기
        case "Escape":
          setOpenPopup(false);
          break;

        //위 아래 -> idx ±1
        case "ArrowUp":
        case "ArrowDown":
          setActive(prev => {
            // 개수 참조
            const len = prev.categorySection === "main" ? countsRef.current.main
                    : prev.categorySection === "sub"  ? countsRef.current.sub : 1;
            if (!len) return prev;
            // idx 계산. 초과 시 0번으로
            return { ...prev, idx: (prev.idx + dir + len) % len };
          });
          break;

        // 오른쪽 -> 메인이면,서브 0번으로 이동
        // 서브가 닫혀있으면, 해당 메인 카테고리를 선택하고 서브 0번으로 이동동
        case "ArrowRight":
          // 서브가 열려있으면, 서브 0번으로 이동
          if(countsRef.current.sub == 0){
            dispatchCategory({ type: "SET_MAINCATEGORY", payload: categories[activeRef.current.idx].text});
          }
          setActive({ categorySection: "sub", idx: 0 });
          break;

        // 왼쪽 -> 서브이면, 메인 0번으로 이동
        case "ArrowLeft":
          setActive(prev => {
            if (prev.categorySection === "sub") return { categorySection: "main", idx: 0 };
            return prev;
          });
          break;

        // Enter -> 선택
        case "Enter":
          const cur = activeRef.current;
          // 메인 선택
          if (cur.categorySection === "main") {
            dispatchCategory({ type: "SET_MAINCATEGORY", payload: categories[cur.idx].text});
            setActive({ categorySection: "sub", idx: 0 });
          }
          // 서브 선택
          else if (cur.categorySection === "sub") {
            dispatchCategory(
              { 
                type: "SET_SUBCATEGORY", 
                payload: categories.find(i => i.text == categoryState.mainCategory)?.subCategory[cur.idx] as SubCategory
              });
            setOpenPopup(false);
          }
          break;
      }
    };

    // onKeyDown 리스너 등록
    window.addEventListener("keydown",  onKeyDown);
    // 중복 제거
    return () => {window.removeEventListener("keydown", onKeyDown);}
  }, [openPopup, setOpenPopup, dispatchCategory, categoryState.mainCategory]);

  //  ★★★ 팝업 외부 클릭 시 닫힘 ★★★

  useEffect(() => {
    if (!openPopup) return;
    
    const handleClick = handleClickOutside(panelRef, toggleRef, setOpenPopup);
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [openPopup, setOpenPopup]);

  //onMainSelect / onSubSelect 함수 생성

  const onMainSelect = (text : MainCategory) => {
    dispatchCategory({ type: "SET_MAINCATEGORY", payload: text});
    setActive({ categorySection: "sub", idx: 0 });
  }

  const onSubSelect = (text : SubCategory) => {
    dispatchCategory({ type: "SET_SUBCATEGORY", payload: text});
    setOpenPopup(false);
  }

  return {panelRef, toggleRef, active, onMainSelect, onSubSelect};
}