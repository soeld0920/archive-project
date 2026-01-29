import { SelectMainItem } from "./SelectMainItem";
import { useEffect, useState } from "react";
import { api } from "axios/api";
import type { MainCategory } from "shared/types/MainCategory";
import { useMainCategorySelectorStore } from "features/Header/store/useMainCategorySeletorStore";
import { useSelectorOpenStore } from "features/Header/store/useSelectorOpenStore";

export function SelectMain(){
  const [mainCategoryOptions, setMainCategoryOptions] = useState<MainCategory[]>([]);
  const {openSelectCategory} = useSelectorOpenStore();
  const {setMainCategoryList} = useMainCategorySelectorStore();
  
  useEffect(() => {
    const fetchMainCategory = async () => {
      const res = await api.get("/category/main");
      setMainCategoryOptions(res.data);
      setMainCategoryList(res.data);
    }
    fetchMainCategory();
  }, [openSelectCategory]);

  return(
    <div className="w-150/525 h-full bg-blue-200">  
      <ul className="w-full h-full overflow-y-scroll flex flex-col gap-0 scrollbar-none py-3">
        {
          mainCategoryOptions.map((item,i) => 
            <SelectMainItem key={item.id} item={item} idx={i} />
          )
        }
      </ul>
    </div>
  )
}