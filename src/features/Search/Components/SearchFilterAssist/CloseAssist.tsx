import { MdClose } from "react-icons/md";
import useIsFilterAssistOpenStore from "../../store/isFilterAssistOpen";

export default function CloseAssist(){
  const {setIsFilterAssistOpen} = useIsFilterAssistOpenStore();

  return (
    <button className="mb-2 ml-auto flex items-center gap-2 cursor-pointer" onClick={() => setIsFilterAssistOpen(false)}>
      Close <MdClose />
    </button>
  )
}