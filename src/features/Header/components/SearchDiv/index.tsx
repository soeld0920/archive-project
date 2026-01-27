// import { CategoryHidden } from "./CategoryHidden";
import { SearchInput } from "./SearchInput";
import { CategoryToggle } from "./CategoryToggle";

export function SearchDiv(){
  return(
    <div 
    className="flex w-full h-full shadow-2xl border-4 border-gray-400 rounded-full
    hover:border-blue-600
    focus-within:border-blue-600
    transition-colors duration-300">
      {/* <CategoryToggle/> */}
      <SearchInput/>
    </div>
  )
}
