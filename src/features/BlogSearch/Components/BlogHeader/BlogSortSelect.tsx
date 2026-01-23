import { useBlogSortContent } from "../../context/BlogSortContext";
import type { BlogSortStandard } from "../../hooks/useBlogSort";
import Dropdown from "shared/components/blocks/InputComponets/Dropdown";

export default function BlogSortSelect(){
  const [sortStandard, setSortStandard] = useBlogSortContent();
  
  const sortOptions: BlogSortStandard[] = ["최신순", "오래된순"];
  
  return (
    <Dropdown
      options={sortOptions}
      value={sortStandard}
      onChange={(value: BlogSortStandard) => setSortStandard(value)}
      toString={(value) => value}
      label={sortStandard}
      width="166px"
      height="46px"
      border={true}
      arrow={true}
    />
  )
}
