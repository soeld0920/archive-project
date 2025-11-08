import { createContext, useContext, useState } from "react"

type ShowFilterType = ReturnType<typeof useState<boolean>>
const ShowFilterContext = createContext<ShowFilterType | null>(null)

export function ShowFilterProvider({children} : {children : React.ReactNode}){
  const value = useState<boolean>();

  return(
    <ShowFilterContext.Provider value={value}>
      {children}
    </ShowFilterContext.Provider>
  )
}

export function useShowFilterContext(){
  const ctx = useContext(ShowFilterContext);
      if (!ctx) {
        throw new Error("ShowFilterContext must be used within <RevalidatorProvider> (and under a Router).");
      }
      return ctx;
}