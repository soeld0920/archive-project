import { useSeriesWritingsContent } from "../../context/SeriesWritingsContext";

type SeriesResultSummaryProps = {
  seriesUuid: string;
}

export default function SeriesResultSummary({seriesUuid} : SeriesResultSummaryProps){
  const [writings] = useSeriesWritingsContent();
  const count = writings.length;
  
  return(
    <h2 style={{margin: 0}}>
      {seriesUuid ? `시리즈 내 ${count}개의 글` : "시리즈를 찾을 수 없습니다"}
    </h2>
  )
}
