import { AiOutlineEnter } from "react-icons/ai";

export default function ShareEnterButton({ onClick }: { onClick?: () => void}) {
  return (
    <button className="
    w-10 h-full rounded-full border-2 border-blue-600
    hover:bg-blue-600 hover:text-white
    transition-all duration-300 ease-in-out
    flex items-center justify-center
    text-gray-700 text-2xl cursor-pointer
    " onClick={onClick}><AiOutlineEnter /></button>
  );
}