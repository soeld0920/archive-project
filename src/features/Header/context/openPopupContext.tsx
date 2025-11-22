import { useContext, useState } from "react";
import { createContext } from "react";

type OpenPopupValue = ReturnType<typeof useState<boolean>>
const OpenPopupContext = createContext<OpenPopupValue | null>(null)

export function OpenPopupProvider({children} : {children : React.ReactNode}){
  const value = useState<boolean>()
  return(
    <OpenPopupContext.Provider value={value}>
      {children}
    </OpenPopupContext.Provider>
  )
}

export function useOpenPopupContext(){
  const ctx = useContext(OpenPopupContext)
  if (!ctx) {
    throw new Error("useOpenPopupContext must be used within a OpenPopupProvider")
  }
  return ctx
}