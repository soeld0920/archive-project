import Dropdown from "../blocks/InputComponets/Dropdown";
import { api } from "axios/api";
import type { MainCategory, SubCategory } from "shared/types/MainCategory";

type CategorySelectProps = {
  mainCategory: MainCategory | undefined;
  subCategory: SubCategory | undefined;
  setMainCategory: (mainCategory: MainCategory | undefined) => void;
  setSubCategory: (subCategory: SubCategory | undefined) => void;
  width?: string;
  height?: string;
  flexDirection?: "row" | "column";
  arrow? : boolean;
}

export default function CategorySelect({mainCategory, subCategory, setMainCategory, setSubCategory, width, height, flexDirection = "column", arrow = true} : CategorySelectProps){
  
  const fetchMainCategory = async () => {
    const response = await api.get("/category/main");
    return response.data;
  }
  
  const fetchSubCategory = async () => {
    const mainCategoryId = mainCategory?.id;
    if(!mainCategoryId) return;
    const response = await api.get(`/category/sub/${mainCategoryId}`);
    return response.data;
  }

  return(
    <div style={{display: "flex", flexDirection: flexDirection, gap: "10px", width: "auto", height: "auto"}}>

      <Dropdown options={[]} value={mainCategory?.name || undefined} onChange={(value) => {setMainCategory(value); setSubCategory(undefined);}} 
      label={`대분류 : ${mainCategory?.name || ""}`} width={width} height={height} toString={(value) => value.name}
      setOptions={fetchMainCategory}
      arrow={arrow}
      />

      <Dropdown options={[]} value={subCategory?.name || undefined} onChange={setSubCategory} 
      label={`소분류 : ${subCategory?.name || ""}`} width={width} height={height} disabled={!mainCategory} toString={(value) => value.name}
      setOptions={fetchSubCategory}
      arrow={arrow}
      />
    </div>
  )
}