import { createContext, useContext } from "react";
import useWrite from "../hook/useWrite";

type WriteValue = ReturnType<typeof useWrite>;
const WriteContext = createContext<WriteValue | null>(null);

export function WriteProvider({children}: {children: React.ReactNode}){
    const write = useWrite();
  return (
    <WriteContext.Provider value={write}>
      {children}
    </WriteContext.Provider>
  )
}

export function useWriteContext(){
  const context = useContext(WriteContext);
  if(!context) throw new Error("useWriteContext must be used within a writeProvider");
  return context;
}