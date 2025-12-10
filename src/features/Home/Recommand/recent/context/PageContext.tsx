import { createContext, useContext } from "react";
import usePage from "shared/hooks/usePage";

type PageValue = ReturnType<typeof usePage>;
const PageContext = createContext<PageValue | null>(null);

export function PageProvider({ children }: { children: React.ReactNode }) {
  const value = usePage();
  return (
    <PageContext.Provider value={value}>
      {children}
    </PageContext.Provider>
  );
}

export function usePageContext() {
  const ctx = useContext(PageContext);
  if (!ctx) {
    throw new Error("usePageContext must be used within a PageProvider");
  }
  return ctx;
}

