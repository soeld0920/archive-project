import React, {createContext, useContext} from "react"
import { useRevalidator, type RevalidationState } from "react-router-dom"

type RevalidatorValue = ReturnType<typeof useRevalidator>;
const RevalidatorContext = createContext<RevalidatorValue | null>(null)

export function RevalidatorProvider({children} : {children : React.ReactNode}){
  const value = useRevalidator()
  return(
    <RevalidatorContext.Provider value={value}>
      {children}
    </RevalidatorContext.Provider>
  )
}

export function useRevalidatorContext() {
  const ctx = useContext(RevalidatorContext);
  if (!ctx) {
    throw new Error("useRevalidatorContext must be used within <RevalidatorProvider> (and under a Router).");
  }
  return ctx;
}