import { RiResetLeftFill } from "react-icons/ri";
import { type MainCategory, type SubCategory } from "shared/types/entity/Category";
import styles from "features/Home/Popular/Popular.module.css";
import PopularFilterCategory from "./PopularFilterCategory";
import PopularFilterPeriod from "./PopularFilterPeriod";
import { useFilterStateContext } from "../../context/filterState";
import { useShowFilterContext } from "../../context/showFilter";
import type { Filter_DataRange } from "shared/types/Filter";

type PopularFilterAsideProps = {
  className : string;
  ref : React.RefObject<HTMLDivElement | null>;
}

export default function PopularFilterAside({className, ref} : PopularFilterAsideProps){
  const {setFilterMainCategory, setFilterSubCategory, setFilterDateRange} = useFilterStateContext();
  const [_,setShowFilter] = useShowFilterContext();

  const handleResetFilter = () => {
    setFilterMainCategory(undefined);
    setFilterSubCategory(undefined);
    setFilterDateRange(undefined);
    setShowFilter(false);
  };

  return(
    <aside ref={ref} className={className}>
      <div className={styles.filterMenu}>
        <PopularFilterCategory/>
        <PopularFilterPeriod/>
        <button className={styles.filterReset} onClick={handleResetFilter}>
          초기화 <RiResetLeftFill />
        </button>
      </div>
    </aside>
  )
}

