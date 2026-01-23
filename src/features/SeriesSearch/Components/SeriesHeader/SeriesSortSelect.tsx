import { useSeriesSortContent } from "../../context/SeriesSortContext";
import type { SeriesSortStandard } from "../../hooks/useSeriesSort";
import Dropdown from "shared/components/blocks/InputComponets/Dropdown";

export default function SeriesSortSelect(){
  const [sortStandard, setSortStandard] = useSeriesSortContent();
  
  const sortOptions: SeriesSortStandard[] = ["시리즈순", "최신순"];
  
  return (
    <Dropdown
      options={sortOptions}
      value={sortStandard}
      onChange={(value: SeriesSortStandard) => setSortStandard(value)}
      toString={(value) => value}
      label={sortStandard}
      width="166px"
      height="46px"
      border={true}
      arrow={true}
    />
  )
}
