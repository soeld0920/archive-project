import { BlogWritingsProvider, useBlogWritingsContent } from "./context/BlogWritingsContext"
import styles from "features/Search/Search.module.css"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { BlogPageProvider } from "./context/BlogPageContext"
import Wrapper from "shared/components/blocks/Wrapper"
import { BlogSortProvider } from "./context/BlogSortContext"
import BlogHeader from "./Components/BlogHeader"
import NoResults from "./Components/NoResults"
import BlogResultsList from "./Components/BlogResultsList"
import SelectPagination from "./Components/SelectPagination"
import { api } from "axios/api"
import { useBlogPageContent } from "./context/BlogPageContext"
import BlogSidebar from "./Components/BlogSidebar"

export default function BlogSearch(){
  return(
    <BlogSortProvider>
      <BlogWritingsProvider>
        <BlogPageProvider>
          <BlogSearchContent/>
        </BlogPageProvider>
      </BlogWritingsProvider>
    </BlogSortProvider>
  )
}

export function BlogSearchContent(){
  const [writings,setWritings] = useBlogWritingsContent();
  const {uuid} = useParams<{uuid: string}>();
  const {page, setPageCount} = useBlogPageContent();

  useEffect(() => {
    if (!uuid) {
      setWritings([]);
      return;
    }

    const fetchWritings = async () => {
      try {
        const res = await api.get(`/writing/byUser/${uuid}`);
        setWritings(res.data);
        setPageCount(res.data.length);
      } catch (error) {
        console.error("Failed to fetch user writings:", error);
        setWritings([]);
      }
    }
    fetchWritings();
  }, [uuid, page]);

  return(
    <main>
      <section>
        <BlogHeader/>
        <Wrapper className={styles.bodyWrapper}>
          <BlogSidebar/>
          {writings.length === 0 ? <NoResults /> : <BlogResultsList/>}
        </Wrapper>
        {writings.length !== 0 && <SelectPagination/>}
      </section>
    </main>
  )
}
