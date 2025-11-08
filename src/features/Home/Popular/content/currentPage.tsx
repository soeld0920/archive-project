import { createContext, useContext, useState } from "react";

type CurrentPageValue = ReturnType<typeof useState<number>>
const CurrentPageContext = createContext<CurrentPageValue | null>(null);

export function CurrentPageProvider({children} : {children : React.ReactNode}){
  const value = useState<number>()

  return(
    <CurrentPageContext.Provider value={value}>
      {children}
    </CurrentPageContext.Provider>
  )
}

export function useCurrentPageContent(){
  const ctx = useContext(CurrentPageContext);
    if (!ctx) {
      throw new Error("CurrentPageContext must be used within <RevalidatorProvider> (and under a Router).");
    }
    return ctx;
}