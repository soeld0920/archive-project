import { createContext, useContext } from "react";
import { useWritings } from "../hooks/useWritings";

type writingsValue = ReturnType<typeof useWritings>;
const WritingsContext = createContext<writingsValue | null>(null);

export function WritingsProvider({children}: {children: React.ReactNode}){
  const writings = useWritings();
  return (
    <WritingsContext.Provider value={writings}>
      {children}
    </WritingsContext.Provider>
  )
}

export function useWritingsContent(){
  const context = useContext(WritingsContext);
  if(!context) throw new Error("useWritingsContent must be used within a WritingsProvider");
  return context;
}