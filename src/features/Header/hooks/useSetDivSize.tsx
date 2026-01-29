//SearchDiv의 크기를 Store에 전달하는 훅.
//SelectCategory의 위치 및 크기 지정에 필요
import { useEffect } from "react";
import { useRef } from "react";
import { useSearchDivSizeStore } from "../store/useSearchDivSizeStore";

export function useSetDivSize(){
  const searchDivRef = useRef<HTMLDivElement>(null);
  const {setSize} = useSearchDivSizeStore();

  // useEffect를 사용해 searchDivRef.current가 세팅됐을 때 그 크기를 divSize로 설정
  useEffect(() => {
    if (searchDivRef.current) {
      const { width, height } = searchDivRef.current.getBoundingClientRect();
      setSize(width, height);
    }
  }, [searchDivRef.current]);

  return {searchDivRef};
}