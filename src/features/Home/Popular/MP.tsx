import { CurrentPageProvider } from "./content/currentPage";
import classNames from "classnames";
import styles from "styles/modules/Main/Popular.module.css"
import MPMain from "./components/MPMain";
import { ShowFilterProvider, useShowFilterContext } from "./content/showFilter";
import { FilterStateProvider } from "./content/filterState";
import MPHidden from "./components/MPHidden";

export default function MP(){
  const [showFilter,_] = useShowFilterContext()
  const MPHiddenClass = classNames({[styles.shown] : showFilter})

  return(
    <MPContext>
      <MPMain/>
      <MPHidden className={MPHiddenClass}/>
    </MPContext>
  )
}

function MPContext({children} : {children : React.ReactNode}){
  return(
    <CurrentPageProvider>
      <ShowFilterProvider>
        <FilterStateProvider>
          {children}
        </FilterStateProvider>
      </ShowFilterProvider>
    </CurrentPageProvider>
  )
}