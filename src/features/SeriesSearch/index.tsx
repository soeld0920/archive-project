import { SeriesWritingsProvider, useSeriesWritingsContent } from "./context/SeriesWritingsContext"
import styles from "features/Search/Search.module.css"
import { useSearchParams } from "react-router-dom"
import { useEffect } from "react"
import { SeriesPageProvider } from "./context/SeriesPageContext"
import Wrapper from "shared/components/blocks/Wrapper"
import { SeriesSortProvider } from "./context/SeriesSortContext"
import SeriesHeader from "./Components/SeriesHeader"
import NoResults from "./Components/NoResults"
import SeriesResultsList from "./Components/SeriesResultsList"
import SelectPagination from "./Components/SelectPagination"
import { api } from "axios/api"
import { useSeriesPageContent } from "./context/SeriesPageContext"
import SeriesSidebar from "./Components/SeriesSidebar"

export default function SeriesSearch(){
  return(
    <SeriesSortProvider>
      <SeriesWritingsProvider>
        <SeriesPageProvider>
          <SeriesSearchContent/>
        </SeriesPageProvider>
      </SeriesWritingsProvider>
    </SeriesSortProvider>
  )
}

export function SeriesSearchContent(){
  const [writings,setWritings] = useSeriesWritingsContent();
  const [params] = useSearchParams();
  const {page, setPageCount} = useSeriesPageContent();
  const seriesUuid = params.get("detail");

  useEffect(() => {
    if (!seriesUuid) {
      setWritings([]);
      return;
    }

    const fetchWritings = async () => {

      try {
        const res = await api.get(`/writing/bySeries/${seriesUuid}`);
        setWritings(res.data);
        setPageCount(res.data.length);
      } catch (error) {
        console.error("Failed to fetch series writings:", error);
      }
    }
    fetchWritings();
  }, [seriesUuid, page]);

  return(
    <main>
      <section>
        <SeriesHeader/>
        <Wrapper className={styles.bodyWrapper}>
          <SeriesSidebar/>
          {writings.length === 0 ? <NoResults /> : <SeriesResultsList/>}
        </Wrapper>
        {writings.length !== 0 && <SelectPagination/>}
      </section>
    </main>
  )
}
