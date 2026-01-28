import { useCategoryContext } from "features/Header/context/categoryContext";
import { useOpenSelectCategoryContext } from "features/Header/context/openSelectCategoryContext";

export function CategorySelecter(){
  const [categoryState] = useCategoryContext();
  const {isSelectCategoryOpen, openSelectCategory} = useOpenSelectCategoryContext();

  return(
    <div
      className={`w-1/4 h-full cursor-pointer transition-colors duration-500 hover:bg-blue-200`}
      style={{
        backgroundColor: isSelectCategoryOpen ? "oklch(88.2% 0.059 254.128)" : undefined,
      }}
      aria-controls="category-popover"
      aria-haspopup="dialog"
      onClick={openSelectCategory}
    >
      <p className="w-full h-full text-xl flex justify-center items-center font-[DungGeunMo] flex flex-col">
        {
          isSelectCategoryOpen ? "전체 카테고리" :
          categoryState.mainCategory ? <>
            <span className="text-lg font-[DungGeunMo]">{categoryState.mainCategory?.name}</span>
            <span className="text-sm font-[DungGeunMo]">{categoryState.subCategory?.name}</span>
          </> :
          "검색 범위 ▾"
        }
      </p>
    </div>
  )
}