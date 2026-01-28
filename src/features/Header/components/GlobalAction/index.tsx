import { FaBell, FaBookmark, FaClock, FaMoon } from "react-icons/fa";

export function GlobalAction(){
  return(
    <div className="w-auto h-auto flex gap-5">
      <button className="text-2xl"><FaMoon /></button>
      <button className="text-2xl"><FaBell /></button>
      <button className="text-2xl"><FaBookmark /></button>
      <button className="text-2xl"><FaClock /></button>
    </div>
  )
}