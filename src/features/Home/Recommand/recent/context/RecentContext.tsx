import { createContext, useContext } from "react";
import useRecent from "../hooks/useRecent";

type RecentValue = ReturnType<typeof useRecent>;
const RecentContext = createContext<RecentValue | null>(null);

export function RecentProvider({ children }: { children: React.ReactNode }) {
  const value = useRecent();
  return (
    <RecentContext.Provider value={value}>
      {children}
    </RecentContext.Provider>
  );
}

export function useRecentContext() {
  const ctx = useContext(RecentContext);
  if (!ctx) {
    throw new Error("useRecentContext must be used within a RecentProvider");
  }
  return ctx;
}

