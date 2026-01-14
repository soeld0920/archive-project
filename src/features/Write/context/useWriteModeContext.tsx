import { createContext, useContext } from "react";
import useWriteMode from "../hook/useWriteMode";
import type { WriteMode } from "../hook/useWriteMode";

type WriteModeValue = ReturnType<typeof useWriteMode>;
const WriteModeContext = createContext<WriteModeValue | null>(null);

export function WriteModeProvider({
  children,
  initialMode = "write",
}: {
  children: React.ReactNode;
  initialMode?: WriteMode;
}) {
  const writeMode = useWriteMode(initialMode);
  return (
    <WriteModeContext.Provider value={writeMode}>
      {children}
    </WriteModeContext.Provider>
  );
}

export function useWriteModeContext() {
  const context = useContext(WriteModeContext);
  if (!context)
    throw new Error(
      "useWriteModeContext must be used within a WriteModeProvider"
    );
  return context;
}

