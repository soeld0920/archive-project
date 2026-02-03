//Div의 크기를 Store에 전달하는 훅.
//위치 및 크기 지정에 필요
import { useEffect } from "react";
import { useRef } from "react";
import { useSizeStore } from "shared/store/useSizeStore";

export function useSetDivSize(key: string){
  const searchDivRef = useRef<HTMLDivElement>(null);
  const {setSize} = useSizeStore(key);

  // ref의 크기 변화를 감지하려면 ResizeObserver를 사용해야 합니다.
  useEffect(() => {
    if (!searchDivRef.current) return;

    const element = searchDivRef.current;
    const handleResize = () => {
      const { width, height } = element.getBoundingClientRect();
      setSize(width, height);
    };

    // ResizeObserver 인스턴스 생성
    const observer = new ResizeObserver(handleResize)
    observer.observe(element);

    // 초기 크기 측정도 실행
    handleResize();

    // cleanup
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [searchDivRef, setSize, key]);

  return {searchDivRef};
}