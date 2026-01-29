import { useEffect, useState } from "react";
import { SelectSubItem } from "./SelectSubItem";
import { api } from "axios/api";
import type { MainCategory, SubCategory } from "shared/types/MainCategory";
import { useMainCategorySelectorStore } from "features/Header/store/useMainCategorySeletorStore";

export function SelectSub(){
  const {selectedMainCategory} = useMainCategorySelectorStore();
  const [subCategoryOptions, setSubCategoryOptions] = useState<SubCategory[]>([]);

  //mainCategory가 있으면, 그에 해당하는 subCategory를 가져옴.
  useEffect(() => {
    if(!selectedMainCategory) return;
    const fetchSubCategory = async () => {
      const res = await api.get(`/category/sub/${selectedMainCategory?.id}`);
      setSubCategoryOptions(res.data);
    }
    fetchSubCategory();
  }, [selectedMainCategory]);

  return(
    <div className="w-375/525 h-full bg-gray-200">  
      <ul className="w-full h-full overflow-y-scroll flex flex-col gap-0 scrollbar-none pl-4">
        {
          subCategoryOptions.map((item,i) =>
          <SelectSubItem key={item.id} parentItem={selectedMainCategory as MainCategory} item={item} idx={i} />)
        }
      </ul>
    </div>
  )
}