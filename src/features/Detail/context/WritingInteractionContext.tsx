import { useContext } from "react";
import { createContext } from "react";
import useWritingInteraction from "../hooks/useWritingInteraction";

type WritingInteractionValue = ReturnType<typeof useWritingInteraction>
const WritingInteractionContext = createContext<WritingInteractionValue | null>(null);

export function WritingInteractionProvider({children} : {children : React.ReactNode}){
  const value = useWritingInteraction()
  return(
    <WritingInteractionContext.Provider value={value}>
      {children}
    </WritingInteractionContext.Provider>
  )
}

export function useWritingInteractionContext() {
  const ctx = useContext(WritingInteractionContext);
  if (!ctx) {
    throw new Error("useWritingInteractionContext must be used within a WritingInteractionProvider");
  }
  return ctx;
}

