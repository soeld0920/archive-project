import { createContext, useContext } from "react";
import usePageAtBlogSearch from "../hooks/usePage";

type BlogPageValue = ReturnType<typeof usePageAtBlogSearch>;
const BlogPageContext = createContext<BlogPageValue | null>(null);

export function BlogPageProvider({children}: {children: React.ReactNode}){
  const page = usePageAtBlogSearch();
  return (
    <BlogPageContext.Provider value={page}>
      {children}
    </BlogPageContext.Provider>
  )
}

export function useBlogPageContent(){
  const context = useContext(BlogPageContext);
  if(!context) throw new Error("useBlogPageContent must be used within a BlogPageProvider");
  return context;
}
