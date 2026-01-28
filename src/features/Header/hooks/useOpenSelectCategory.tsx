import { useEffect, useRef, useState, type RefObject } from "react";
import { useEventListener } from "usehooks-ts";

export function useOpenSelectCategory(){
  const [openSelectCategory, setOpenSelectCategory] = useState(false);
  const HOVER_TIME = 1500;

  //카테고리 오픈 - div에 n초 동안 마우스 호버
  const selecterRef = useRef<HTMLDivElement>(null);
  //마우스오버 중 얼마나 오버했는지를 저장. 
  const [hoverTime, setHoverTime] = useState(0);
  //마우스오버 중인지를 체크
  const [isHovering, setIsHovering] = useState(false);
  //마우스오버 감지
  useEventListener("mouseenter", () => {
    console.log("mouseenter");
    setIsHovering(true);
  }, selecterRef as RefObject<HTMLDivElement>);

  useEventListener("mouseout", () => {
    console.log("mouseout");
    setIsHovering(false);
  }, selecterRef as RefObject<HTMLDivElement>);

  //마우스오버 중이면 hovertime 증가, 도달 시 open 변경
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isHovering) {
      // hover 해제 시
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setHoverTime(0);
      return;
    }

    // hover 시작
    intervalRef.current = window.setInterval(() => {
      setHoverTime(prev => prev + 100);
    }, 100);

    // cleanup (isHovering 바뀌거나 언마운트)
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isHovering]);
  
  useEffect(() => {
    if(hoverTime >= HOVER_TIME){
      setOpenSelectCategory(true);
    }
  }, [hoverTime]);

  //클릭시 즉시 카테고리 오픈
  useEventListener("click", () => {
    setHoverTime(HOVER_TIME)
    setOpenSelectCategory(true);
  }, selecterRef as RefObject<HTMLDivElement>);

  //카테고리 닫기
  //해당 컴포넌트 전 영역을 ref로 담고, ref를 넘어가면 즉시 닫기.
  const containerRef = useRef<HTMLDivElement>(null);
  useEventListener("mouseleave", () => {
    setOpenSelectCategory(false);
  })

  return {openSelectCategory, HOVER_TIME, selecterRef, containerRef}
}