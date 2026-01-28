//SearchDiv의 크기를 전달하는 훅.
//SelectCategory의 위치 및 크기 지정에 필요
import { useEffect } from "react";
import { useRef, useState } from "react";

export function useDivSize(){
  const [divSize, setDivSize] = useState({width : 0, height : 0});
  const searchDivRef = useRef<HTMLDivElement>(null);

  // useEffect를 사용해 searchDivRef.current가 세팅됐을 때 그 크기를 divSize로 설정
  useEffect(() => {
    if (searchDivRef.current) {
      const { width, height } = searchDivRef.current.getBoundingClientRect();
      setDivSize({ width : width * 7/8, height });
    }
  }, [searchDivRef.current]);

  return {divSize, searchDivRef};
}