import { FaSearch } from "react-icons/fa";

export function ConfirmButton(){
  return(
    <button className="
    w-3/24 h-full 
    flex justify-center items-center
    hover:bg-blue-600 
    transition-all duration-500
    group">
      <FaSearch className="
      text-blue-600 text-2xl group-hover:text-gray-50 
      transition-all duration-500" />
    </button>
  )
}