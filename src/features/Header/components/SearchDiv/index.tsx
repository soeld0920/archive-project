// import { CategoryHidden } from "./CategoryHidden";
import { SearchInput } from "./SearchInput";
import { CategorySelecter } from "./CategorySelecter";
import { ConfirmButton } from "./ConfirmButton";

export function SearchDiv(){
  return(
    <div 
    className="flex items-center
    w-full h-full shadow-2xl border-4 border-gray-400 rounded-full
    bg-gray-50
    hover:border-blue-600
    focus-within:border-blue-600
    transition-colors duration-300
    overflow-hidden">
      <CategorySelecter/>
      <div className="w-0 h-2/3 border-l-2 border-inherit"/>
      <SearchInput/>
      <div className="w-0 h-full border-l-3 border-inherit"/>
      <ConfirmButton/>
    </div>
  )
}
