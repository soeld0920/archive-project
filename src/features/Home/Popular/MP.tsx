import { CurrentPageProvider } from "./content/currentPage";
import classNames from "classnames";
import styles from "styles/modules/Main/Popular.module.css"
import { ShowFilterProvider, useShowFilterContext } from "./content/showFilter";
import { FilterStateProvider } from "./content/filterState";
import MPSection from "./components/MPSection";
import MPFilterAside from "./components/MPFilterAside";

export default function MP(){
  return(
    <CurrentPageProvider>
      <ShowFilterProvider>
        <FilterStateProvider>
          <MPInner/>
        </FilterStateProvider>
      </ShowFilterProvider>
    </CurrentPageProvider>
  )
}


function MPInner(){
  const [showFilter,_] = useShowFilterContext()
  const MPHiddenClass = classNames({[styles.hiddenWrapper] : true,[styles.shown] : showFilter})

  return(
    <section className={styles.wrapper}>
      <MPSection/>
      <MPFilterAside className={MPHiddenClass}/>
    </section>
  )
}