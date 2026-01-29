import type { MainCategory, SubCategory } from "shared/types/MainCategory";
import { useSearchCategoryStore } from "features/Header/store/useSearchCategoryStore";
import { useSelectorOpenStore } from "features/Header/store/useSelectorOpenStore";  

type SelectSubItemProps = {
  parentItem : MainCategory;
  item : SubCategory;
  idx : number;
}

export function SelectSubItem({parentItem, item, idx} : SelectSubItemProps){
  const {setAllCategory} = useSearchCategoryStore();
  const {closeSelectCategory} = useSelectorOpenStore(); 

  return(
  <li className="w-full h-auto py-2"> 
    <button 
      className="text-gray-500 text-lg font-[DungGeunMo] cursor-pointer hover:text-blue-600 hover:bold"
      onClick={() => {setAllCategory(parentItem, item); closeSelectCategory();}}>
      {item.name}
    </button>
  </li>
  )
}