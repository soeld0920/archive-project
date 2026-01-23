import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "axios/api";
import styles from "features/Search/Search.module.css";

export default function SeriesSidebar(){
  const [params] = useSearchParams();
  const seriesUuid = params.get("detail");
  const [seriesInfo, setSeriesInfo] = useState<{title: string, description?: string} | null>(null);

  useEffect(() => {
    if (!seriesUuid) return;
    
    const fetchSeriesInfo = async () => {
      try {
        const response = await api.get(`/series/${seriesUuid}`);
        setSeriesInfo({
          title: response.data.seriesTitle || "시리즈 제목 없음",
          description: response.data.description
        });
      } catch (error) {
        console.error("Failed to fetch series info:", error);
      }
    };

    fetchSeriesInfo();
  }, [seriesUuid]);

  if (!seriesUuid) return null;

  return(
    <aside style={{width : "370px", height : "100%"}}>
      <div className={styles.filterPanel} style={{padding: "10px"}}>
        <h3 style={{margin: 0, marginBottom: "10px"}}>시리즈 정보</h3>
        <h4 style={{margin: 0, marginBottom: "10px"}}>{seriesInfo?.title || "로딩 중..."}</h4>
        {seriesInfo?.description && (
          <p style={{margin: 0}}>{seriesInfo.description}</p>
        )}
      </div>
    </aside>
  )
}
