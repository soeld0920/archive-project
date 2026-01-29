import { useSearchCategoryStore } from "features/Header/store/useSearchCategoryStore";
import { useIsSelectCategoryOpenStore } from "../../store/useSelectorOpenStore";

export function CategorySelecter(){
  const {mainCategory, subCategory} = useSearchCategoryStore();
  const {isSelectCategoryOpen, openSelectCategory} = useIsSelectCategoryOpenStore();

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
          mainCategory ? <>
            <span className="text-lg font-[DungGeunMo]">{mainCategory?.name}</span>
            <span className="text-sm font-[DungGeunMo]">{subCategory?.name}</span>
          </> :
          "검색 범위 ▾"
        }
      </p>
    </div>
  )
}