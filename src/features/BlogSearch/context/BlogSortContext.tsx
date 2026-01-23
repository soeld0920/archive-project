import { createContext, useContext } from "react";
import useBlogSort from "../hooks/useBlogSort";

type BlogSortValue = ReturnType<typeof useBlogSort>;
const BlogSortContext = createContext<BlogSortValue | null>(null);

export function BlogSortProvider({children}: {children: React.ReactNode}){
  const sort = useBlogSort();
  return (
    <BlogSortContext.Provider value={sort}>
      {children}
    </BlogSortContext.Provider>
  )
}

export function useBlogSortContent(){
  const context = useContext(BlogSortContext);
  if(!context) throw new Error("useBlogSortContent must be used within a BlogSortProvider");
  return context;
}
