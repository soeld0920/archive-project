import { api } from "axios/api";
import CancelButton from "shared/components/blocks/InputComponets/CancelButton";
import Dropdown from "shared/components/blocks/InputComponets/Dropdown";
import SubmitButton from "shared/components/blocks/InputComponets/SubmitButton";
import commonStyles from "features/BlogManage/style/BlogManage.module.css";
import styles from "features/BlogManage/style/SeriesManage.module.css";
import { useSeriesContext } from "./context/useSeries";
import { useMessageContext } from "app/providers/message";

export default function SelectSeries(){
  const { series, setSeries, writingList } = useSeriesContext();
  const [messageApi] = useMessageContext();

  const fetchSeries = async () => {
    const response = await api.get("/series/me/index");
    return response.data;
  }

  const fetchSeriesOrders = async () => {
    await api.patch(`/writing/seriesOrder/${series?.seriesUuid}`,
      writingList.map((writing, i) => {return {index : i, writingUuid : writing.writingUuid}}),
    ).then(() => {
      messageApi.open({type : "success", content : "시리즈 순서 변경 완료", duration : 2});
      window.location.reload();
    }).catch(() => {
      messageApi.open({type : "error", content : "시리즈 순서 변경 실패", duration : 2});
    })
  }
  
  return(
    <div className={commonStyles.formSection}>
      <Dropdown options={[]} setOptions={fetchSeries} 
      value={series} onChange={setSeries} label={series?.title || "시리즈 선택"} toString={(value) => value.title} />
      <div className={styles.selectSeriesButtons}>
        <CancelButton onClick={() => {setSeries(undefined);}} label="취소" width="40%" height="100%" />
        <SubmitButton onClick={fetchSeriesOrders} label="확인" width="40%" height="100%" />
      </div>
    </div>
  )
}