// 카테고리 선택 상태를 계속 들고다니기 위한 전역 context
import { useContext } from "react";
import { createContext } from "react";
import { useMainCategorySelector } from "../hooks/useMainCategorySelector";

type MainCategorySelectorValue = ReturnType<typeof useMainCategorySelector>
const MainCategorySelectorContext = createContext<MainCategorySelectorValue | null>(null);

export function MainCategorySelectorProvider({children} : {children : React.ReactNode}){
  const value = useMainCategorySelector()
  return(
    <MainCategorySelectorContext.Provider value={value}>
      {children}
    </MainCategorySelectorContext.Provider>
  )
}

export function useMainCategorySelectorContext() {
  const ctx = useContext(MainCategorySelectorContext);
  if (!ctx) {
    throw new Error("useMainCategorySelectorContext must be used within a MainCategorySelectorProvider");
  }
  return ctx;
}