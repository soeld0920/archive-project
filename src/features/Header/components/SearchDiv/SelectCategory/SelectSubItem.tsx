import { useCategoryContext } from "features/Header/context/categoryContext";
import { useOpenSelectCategoryContext } from "features/Header/context/openSelectCategoryContext";
import type { MainCategory, SubCategory } from "shared/types/MainCategory";

type SelectSubItemProps = {
  parentItem : MainCategory;
  item : SubCategory;
  idx : number;
}

export function SelectSubItem({parentItem, item, idx} : SelectSubItemProps){
  const [_, setCategoryState] = useCategoryContext();
  const {closeSelectCategory} = useOpenSelectCategoryContext();

  return(
  <li className="w-full h-auto py-2"> 
    <button 
      className="text-gray-500 text-lg font-[DungGeunMo] cursor-pointer hover:text-blue-600 hover:bold"
      onClick={() => {setCategoryState({type : "SET_ALL", payload : {mainCategory : parentItem, subCategory : item}}); closeSelectCategory();}}>
      {item.name}
    </button>
  </li>
  )
}