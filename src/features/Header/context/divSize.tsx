// 카테고리 선택 상태를 계속 들고다니기 위한 전역 context
import { useContext } from "react";
import { useDivSize } from "features/Header/hooks/useDivSize";
import { createContext } from "react";

type DivSizeValue = ReturnType<typeof useDivSize>
const DivSizeContext = createContext<DivSizeValue | null>(null);

export function DivSizeProvider({children} : {children : React.ReactNode}){
  const value = useDivSize()
  return(
    <DivSizeContext.Provider value={value}>
      {children}
    </DivSizeContext.Provider>
  )
}

export function useDivSizeContext() {
  const ctx = useContext(DivSizeContext);
  if (!ctx) {
    throw new Error("useDivSizeContext must be used within a DivSizeProvider");
  }
  return ctx;
}