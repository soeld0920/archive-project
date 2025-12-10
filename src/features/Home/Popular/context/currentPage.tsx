import { createContext, useContext } from "react";
import usePageAtMainPopular from "../hooks/usePageAtMainPopular";

type CurrentPageValue = ReturnType<typeof usePageAtMainPopular>
const CurrentPageContext = createContext<CurrentPageValue | null>(null);

export function CurrentPageProvider({children} : {children : React.ReactNode}){
  const value = usePageAtMainPopular();
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