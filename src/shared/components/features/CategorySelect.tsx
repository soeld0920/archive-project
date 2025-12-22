import Dropdown from "../blocks/InputComponets/Dropdown";
import { useEffect, useState } from "react";
import { api } from "axois/api";
import type { MainCategory, SubCategory } from "shared/types/MainCategory";

type CategorySelectProps = {
  mainCategory: MainCategory | undefined;
  subCategory: SubCategory | undefined;
  setMainCategory: (mainCategory: MainCategory | undefined) => void;
  setSubCategory: (subCategory: SubCategory | undefined) => void;
  width?: string;
  height?: string;
}

export default function CategorySelect({mainCategory, subCategory, setMainCategory, setSubCategory, width, height} : CategorySelectProps){
  const [mainCategoryOptions, setMainCategoryOptions] = useState<MainCategory[]>([]);
  const [subCategoryOptions, setSubCategoryOptions] = useState<SubCategory[]>([]);
  
  useEffect(() => {
      const fetchMainCategory = async () => {
        const response = await api.get("/category/main");
        setMainCategoryOptions(response.data);
      }
      fetchMainCategory();
    }, []);

  useEffect(() => {
    const fetchSubCategory = async () => {
      const mainCategoryId = mainCategory?.id;
      if(!mainCategoryId) return;
      const response = await api.get(`/category/sub/${mainCategoryId}`);
      setSubCategoryOptions(response.data);
    }
    fetchSubCategory();
    setSubCategory(undefined);
  }, [mainCategory]);

  return(
    <div style={{display: "flex", flexDirection: "column", gap: "10px", width: width, height: "auto"}}>
      <Dropdown options={mainCategoryOptions} value={mainCategory?.name || undefined} onChange={setMainCategory} 
      label={`대분류 : ${mainCategory?.name || ""}`} width={width} height={height} toString={(value) => value.name}/>
      <Dropdown options={subCategoryOptions} value={subCategory?.name || undefined} onChange={setSubCategory} 
      label={`소분류 : ${subCategory?.name || ""}`} width={width} height={height} disabled={!mainCategory} toString={(value) => value.name}/>
    </div>
  )
}