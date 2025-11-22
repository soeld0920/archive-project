// 카테고리 선택 상태를 계속 들고다니기 위한 전역 context
import { useContext, useState } from "react";
import { createContext } from "react";
import type { Writing } from "shared/types/Writing";

type WritingValue = ReturnType<typeof useState<Writing | null>>
const WritingContext = createContext<WritingValue | null>(null);

export function WritingProvider({children} : {children : React.ReactNode}){
  const value = useState<Writing | null>()
  return(
    <WritingContext.Provider value={value}>
      {children}
    </WritingContext.Provider>
  )
}

export function useWritingContext() {
  const ctx = useContext(WritingContext);
  if (!ctx) {
    throw new Error("useWritingContext must be used within a WritingProvider");
  }
  return ctx;
}