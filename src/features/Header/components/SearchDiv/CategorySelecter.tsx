import { useCategoryContext } from "features/Header/context/categoryContext";
import { useOpenSelectCategoryContext } from "features/Header/context/openSelectCategoryContext";
import { motion } from "motion/react";

export function CategorySelecter(){
  const [categoryState] = useCategoryContext();
  const {openSelectCategory, HOVER_TIME, selecterRef} = useOpenSelectCategoryContext();

  return(
    <motion.div className="w-1/4 h-full"
    aria-controls="category-popover" aria-haspopup="dialog" ref={selecterRef}
    whileHover={{backgroundColor: "#64B5F6", transition: {duration: 1.5}}}
    >
      <p className="w-full h-full text-lg flex justify-center items-center">
        {
          openSelectCategory ? "전체 카테고리" :
          categoryState.mainCategory ? <>
            <span>{categoryState.mainCategory?.name}</span>
            <span>{categoryState.subCategory?.name}</span>
          </> :
          "카테고리 선택 ▼"
        }
      </p>
    </motion.div>
  )
}