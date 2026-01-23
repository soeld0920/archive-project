import { createContext, useContext } from "react";
import { useBlogWritings } from "../hooks/useBlogWritings";
import { useBlogSortContent } from "./BlogSortContext";

type BlogWritingsValue = ReturnType<typeof useBlogWritings>;
const BlogWritingsContext = createContext<BlogWritingsValue | null>(null);

export function BlogWritingsProvider({children}: {children: React.ReactNode}){
  const [sortStandard] = useBlogSortContent();
  const writings = useBlogWritings(sortStandard);
  return (
    <BlogWritingsContext.Provider value={writings}>
      {children}
    </BlogWritingsContext.Provider>
  )
}

export function useBlogWritingsContent(){
  const context = useContext(BlogWritingsContext);
  if(!context) throw new Error("useBlogWritingsContent must be used within a BlogWritingsProvider");
  return context;
}
