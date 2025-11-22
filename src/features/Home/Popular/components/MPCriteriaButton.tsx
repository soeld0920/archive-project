import { useEffect, useState } from "react";
import { useFilterStateContext } from "../content/filterState";
import { useShowFilterContext } from "../content/showFilter";
import { useMessageContext } from "app/providers/message";
import styles from "styles/modules/Main/Popular.module.css"

export default function MPCriteriaButton(){
  const [criteria] = useFilterStateContext();
  const [showFilter, setShowFilter] = useShowFilterContext()
  const [message] = useMessageContext()
  const [isCooldown,setIsCooldown] = useState(false);
  let label = "";
  console.log(criteria)

  label = `${criteria?.mainCategory ? `분류 : ${criteria.mainCategory} ` : ""}${criteria?.subCategory ? `> ${criteria.subCategory}` : ""}${criteria?.dateRange ? "(기간 필터 적용됨)" : ""}`;
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
    <button onClick={handleToggle} className={styles.criteriaButton}>
      {label}
    </button>
  )
}