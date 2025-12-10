import { createContext, useContext } from "react";
import useBinner from "../hooks/useBinner";

type BinnerValue = ReturnType<typeof useBinner>;
const BinnerContext = createContext<BinnerValue | null>(null);

export function BinnerProvider({ children }: { children: React.ReactNode }) {
  const value = useBinner();
  return (
    <BinnerContext.Provider value={value}>
      {children}
    </BinnerContext.Provider>
  );
}

export function useBinnerContext() {
  const ctx = useContext(BinnerContext);
  if (!ctx) {
    throw new Error("useBinnerContext must be used within a BinnerProvider");
  }
  return ctx;
}

