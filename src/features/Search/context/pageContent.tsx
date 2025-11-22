import { createContext, useContext } from "react";
import usePage from "../hooks/usePage";

type PageValue = ReturnType<typeof usePage>;
const pageContext = createContext<PageValue | null>(null);

export function PageProvider({children}: {children: React.ReactNode}){
  const page = usePage();
  return (
    <pageContext.Provider value={page}>
      {children}
    </pageContext.Provider>
  )
}

export function usePageContent(){
  const context = useContext(pageContext);
  if(!context) throw new Error("usepageContent must be used within a pageProvider");
  return context;
}