import { SelectMainItem } from "./SelectMainItem";
import type { MainCategory } from "shared/types/MainCategory";
import { useMainCategoryList } from "features/Header/hooks/query/useMainCategoryList";

export function SelectMain(){
  
  const {data : mainCategoryList} = useMainCategoryList();

  return(
    <div className="w-150/525 h-full bg-blue-200">  
      <ul className="w-full h-full overflow-y-scroll flex flex-col gap-0 scrollbar-none py-3">
        {
          mainCategoryList?.map((item : MainCategory,i : number) => 
            <SelectMainItem key={item.id} item={item} idx={i} />
          )
        }
      </ul>
    </div>
  )
}