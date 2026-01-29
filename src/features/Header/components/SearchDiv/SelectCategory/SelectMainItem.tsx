import { useCategoryContext } from "features/Header/context/categoryContext";
import { useMainCategorySelectorContext } from "features/Header/context/mainCategorySeletor";
import type { MainCategory } from "shared/types/MainCategory";
import { useOpenSelectCategoryContext } from "features/Header/context/openSelectCategoryContext";

type SelectMainItemProps = {
  item : MainCategory;
  idx : number;
}

export function SelectMainItem({item, idx} : SelectMainItemProps){
  const [_, setCategoryState] = useCategoryContext();
  const {closeSelectCategory} = useOpenSelectCategoryContext();
  const {setSelectedMainCategoryIndex, selectedMainCategoryIndex} = useMainCategorySelectorContext();
  const isSelected = selectedMainCategoryIndex === idx;

  return(
    <li 
    className="w-full h-auto py-3 text-center" 
    style={isSelected ? {
      backgroundColor : "oklch(92.8% 0.006 264.531)"
    } : {}}
    onMouseEnter={() => {setSelectedMainCategoryIndex(idx)}}>
      <button className="text-gray-500 text-lg font-[Galmuri] cursor-pointer" style={isSelected ? {
        color : " oklch(27.8% 0.033 256.848)", 
        fontWeight : "bold",
      } : {}}
      onClick={() => {setCategoryState({type : "SET_MAINCATEGORY", payload : item}); closeSelectCategory();}}
      >
        {item.name}
      </button>
    </li>
  )
}