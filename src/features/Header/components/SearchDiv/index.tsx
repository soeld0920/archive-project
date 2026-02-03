// import { CategoryHidden } from "./CategoryHidden";
import { SearchInput } from "./SearchInput";
import { CategorySelecter } from "./CategorySelecter";
import { ConfirmButton } from "./ConfirmButton";
import { useSelectorOpenStore } from "../../store/useSelectorOpenStore";
import { useSetDivSize } from "shared/hooks/useSetDivSize";

export function SearchDiv(){
  const {isSelectCategoryOpen} = useSelectorOpenStore();
  const {searchDivRef} = useSetDivSize("header-search-div");

  return(
    <div 
    className="flex items-center
    w-full h-20 shadow-2xl border-4 border-gray-400 rounded-full
    bg-gray-50
    hover:border-blue-600
    focus-within:border-blue-600
    transition-colors duration-500
    overflow-hidden
    box-sizing: border-box;"
    style={{
      borderBottomLeftRadius: isSelectCategoryOpen ? 0 : undefined
    }}
    ref={searchDivRef}
    >
      <CategorySelecter/>
      {isSelectCategoryOpen ? null : <div className="w-0 h-2/3 border-l-2 border-inherit"/>}
      <SearchInput/>
      <div className="w-0 h-full border-l-3 border-inherit"/>
      <ConfirmButton/>
    </div>
  )
}
