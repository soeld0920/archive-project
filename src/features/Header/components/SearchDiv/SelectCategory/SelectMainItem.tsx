import type { MainCategory } from "shared/types/MainCategory";
import { useIsSelectCategoryOpenStore } from "features/Header/store/useSelectorOpenStore";
import { useMainCategorySelectorStore } from "features/Header/store/useMainCategorySeletorStore";
import { useSearchCategoryStore } from "features/Header/store/useSearchCategoryStore";

type SelectMainItemProps = {
  item : MainCategory;
  idx : number;
}

export function SelectMainItem({item, idx} : SelectMainItemProps){
  const {closeSelectCategory} = useIsSelectCategoryOpenStore();
  const {selectMainCategoryIndex, selectedMainCategoryIndex} = useMainCategorySelectorStore();
  const {setMainCategory} = useSearchCategoryStore();
  const isSelected = selectedMainCategoryIndex === idx;

  return(
    <li 
    className="w-full h-auto py-3 text-center" 
    style={isSelected ? {
      backgroundColor : "oklch(92.8% 0.006 264.531)"
    } : {}}
    onMouseEnter={() => {selectMainCategoryIndex(idx)}}>
      <button className="text-gray-500 text-lg font-[DungGeunMo] cursor-pointer" style={isSelected ? {
        color : " oklch(27.8% 0.033 256.848)", 
        fontWeight : "bold",
      } : {}}
      onClick={() => {selectMainCategoryIndex(idx); setMainCategory(item); closeSelectCategory();}}
      >
        {item.name}
      </button>
    </li>
  )
}