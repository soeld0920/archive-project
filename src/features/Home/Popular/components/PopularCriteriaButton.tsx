import { useEffect, useState } from "react";
import { useFilterStateContext } from "../context/filterState";
import { useShowFilterContext } from "../context/showFilter";
import { useMessageContext } from "app/providers/message";
import styles from "features/Home/Popular/Popular.module.css"

type PopularCriteriaButtonProps = {
  ref : React.RefObject<HTMLButtonElement | null>;
}

export default function PopularCriteriaButton({ref} : PopularCriteriaButtonProps){
  const {filter} = useFilterStateContext();
  const [showFilter, setShowFilter] = useShowFilterContext()
  const [message] = useMessageContext()
  const [isCooldown,setIsCooldown] = useState(false);
  let label = "";

  label = `${filter?.mainCategory ? `분류 : ${filter.mainCategory} ` : ""}${filter?.subCategory ? `> ${filter.subCategory}` : ""}${filter?.dateRange ? "(기간 필터 적용됨)" : ""}`;
  if(label === "") label = "전체보기 >"

  const handleToggle = () => {
    if(isCooldown) {
      message.open({type : "error", content : "너무 빠릅니다!"})
      return
    }
    setShowFilter(!showFilter)
    setIsCooldown(true)
  }

  useEffect(() => {
    if(!isCooldown) return

    const timer = setTimeout(() => {setIsCooldown(false)} , 200)
    return () => clearTimeout(timer)
  },[isCooldown])

  return(
    <button ref={ref} onClick={handleToggle} className={styles.criteriaButton}>
      {label}
    </button>
  )
}

