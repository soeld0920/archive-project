import { CurrentPageProvider } from "./context/currentPage";
import classNames from "classnames";
import styles from "features/Home/Popular/Popular.module.css"
import { ShowFilterProvider, useShowFilterContext } from "./context/showFilter";
import { FilterStateProvider } from "./context/filterState";
import PopularSectionComponent from "./components/sectionComponents/PopularSection";
import PopularFilterAside from "./components/FilterAside";

export default function PopularSection(){
  return(
    <FilterStateProvider>
      <CurrentPageProvider>
        <ShowFilterProvider>
            <PopularInner/>
        </ShowFilterProvider>
      </CurrentPageProvider>
    </FilterStateProvider>
  )
}


function PopularInner(){
  return(
    <section className={styles.wrapper}>
      <PopularSectionComponent/>
    </section>
  )
}