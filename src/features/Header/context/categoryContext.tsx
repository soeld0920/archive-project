// 카테고리 선택 상태를 계속 들고다니기 위한 전역 context
import { useContext } from "react";
import { useCategory } from "shared/hooks/useCategory";
import { createContext } from "react";

type CategoryValue = ReturnType<typeof useCategory>
const CategoryContext = createContext<CategoryValue | null>(null);

export function CategoryProvider({children} : {children : React.ReactNode}){
  const value = useCategory()
  return(
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  )
}

export function useCategoryContext() {
  const ctx = useContext(CategoryContext);
  if (!ctx) {
    throw new Error("useCategoryContext must be used within a CategoryProvider");
  }
  return ctx;
}