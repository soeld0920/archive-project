// 카테고리 선택 오픈 상태를 전역으로 관리하기 위한 context
import { useContext, createContext } from "react";
import { useOpenSelectCategory } from "../hooks/useOpenSelectCategory";

type OpenSelectCategoryValue = ReturnType<typeof useOpenSelectCategory>;
const OpenSelectCategoryContext = createContext<OpenSelectCategoryValue | null>(null);

export function OpenSelectCategoryProvider({ children }: { children: React.ReactNode }) {
  const value = useOpenSelectCategory();
  return (
    <OpenSelectCategoryContext.Provider value={value}>
      {children}
    </OpenSelectCategoryContext.Provider>
  );
}

export function useOpenSelectCategoryContext() {
  const ctx = useContext(OpenSelectCategoryContext);
  if (!ctx) {
    throw new Error("useOpenSelectCategoryContext must be used within a OpenSelectCategoryProvider");
  }
  return ctx;
}
