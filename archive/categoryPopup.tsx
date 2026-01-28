import { useContext } from "react";
import { createContext } from "react";
import { useCategoryPopup } from "../../../../archive/useCategoryPopup";

type CategoryPopupValue = ReturnType<typeof useCategoryPopup>
const CategoryPopupContext = createContext<CategoryPopupValue | null>(null)

export function CategoryPopupProvider({children} : {children : React.ReactNode}){
  const value = useCategoryPopup()
  return(
    <CategoryPopupContext.Provider value={value}>
      {children}
    </CategoryPopupContext.Provider>
  )
}

export function useCategoryPopupContext(){
  const ctx = useContext(CategoryPopupContext)
  if (!ctx) {
    throw new Error("useCategoryPopupContext must be used within a CategoryPopupProvider")
  }
  return ctx
}