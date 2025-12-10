import { createContext, useContext } from "react";
import usePageAtSearch from "../hooks/usePage";

type PageValue = ReturnType<typeof usePageAtSearch>;
const pageContext = createContext<PageValue | null>(null);

export function PageProvider({children}: {children: React.ReactNode}){
  const page = usePageAtSearch();
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