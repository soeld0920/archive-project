import { AnimatePresence, motion } from "motion/react";
import { useDivSizeContext } from "features/Header/context/divSize";
import { SelectMain } from "./SelectMain";
import { SelectSub } from "./SelectSub";
import { useOpenSelectCategoryContext } from "features/Header/context/openSelectCategoryContext";

export function SelectCategory(){
  const {divSize} = useDivSizeContext();
  const {isSelectCategoryOpen} = useOpenSelectCategoryContext();
  
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
        width : divSize.width,
        top : divSize.height,
        borderBottomLeftRadius: divSize.height / 2,
        borderBottomRightRadius: divSize.height / 2,
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