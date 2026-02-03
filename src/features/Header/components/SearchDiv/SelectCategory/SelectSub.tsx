import { SelectSubItem } from "./SelectSubItem";
import type { MainCategory, SubCategory } from "shared/types/MainCategory";
import { useMainCategorySelectorStore } from "features/Header/store/useMainCategorySeletorStore";
import { useQuery } from "@tanstack/react-query";
import { getSubCategoryList } from "shared/api/getSubCategoryList";
import { useMainCategoryList } from "features/Header/hooks/query/useMainCategoryList";

export function SelectSub(){
  const { data: mainCategories = [] } = useMainCategoryList();
  
  const idx = useMainCategorySelectorStore(s => s.selectedMainCategoryIndex);
  const mainCategoryId = idx === undefined ? undefined : mainCategories[idx]?.id;
  
  const { data: subCategoryList = []} = useQuery({
    queryKey: ["subCategoryList", mainCategoryId],
    queryFn: () => getSubCategoryList(mainCategoryId!),
    enabled: !!mainCategoryId,
  });
  
  
  return(
    <div className="w-375/525 h-full bg-gray-200">  
      <ul className="w-full h-full overflow-y-scroll flex flex-col gap-0 scrollbar-none pl-4">
        {
          subCategoryList.length === 0 
          ? 
          <li className="w-full h-full flex justify-center items-center text-center text-gray-500">왼쪽에서 메인 카테고리를 선택하시면 이곳에 서브 카테고리가 표시됩니다!</li> 
          :
          subCategoryList?.map((item : SubCategory,i : number) =>
            <SelectSubItem key={item.id} parentItem={mainCategories[idx!] as MainCategory} item={item} idx={i} />)
        }
      </ul>
    </div>
  )
}