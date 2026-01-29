import { AnimatePresence, motion } from "motion/react";
import { SelectMain } from "./SelectMain";
import { SelectSub } from "./SelectSub";
import { useSearchDivSizeStore } from "features/Header/store/useSearchDivSizeStore";
import { useSelectorOpenStore } from "features/Header/store/useSelectorOpenStore";

export function SelectCategory(){
  const {width, height} = useSearchDivSizeStore();
  const {isSelectCategoryOpen} = useSelectorOpenStore();
  
  return(
    <AnimatePresence >
      {isSelectCategoryOpen && <motion.div className={`
      absoulte left-0 
      box-sizing: border-box;
      h-auto
      border-4 border-gray-400
      border-t-0
      z-10
      overflow-hidden
      shadow-lg
      `}
      style={{
        width : width * 7/8,
        top : height,
        borderBottomLeftRadius: height / 2,
        borderBottomRightRadius: height / 2,
      }}
      initial={{height : 0}}
      animate={{height : "400px"}}
      exit={{height : 0}}
      transition={{duration : 0.5}}
      key="modal"
      >
        <div style={{display:"flex", height : "400px"}}>
          <SelectMain />
          <SelectSub />
        </div>
      </motion.div>}
    </AnimatePresence>
  )
}