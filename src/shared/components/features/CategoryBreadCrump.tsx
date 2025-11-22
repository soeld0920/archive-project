/*
  현재 선택된 카테고리를 보여주는 컴포넌트
  카테고리 미 선택시 fallback 값 표시
*/

import { Breadcrumb } from "antd";
import type { BreadcrumbItemType, BreadcrumbSeparatorType } from "antd/es/breadcrumb/Breadcrumb";
import classNames from "classnames";
import type { MainCategory, SubCategory } from "shared/types/category";
import { isSubCategoryOf } from "shared/lib/utils/categoryGuard";

type CategoryBreadCrumpProps = {
  mainCategory? : MainCategory;
  subCategory? : SubCategory;
  className? :string;
  fallback? : string;
}

export default function CategoryBreadcrumb({mainCategory, subCategory, className,fallback = "전체보기"} : CategoryBreadCrumpProps){

  const separator = ">";
  let items : Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[] = [];
  
  if(!mainCategory) items = [{title : fallback}];
  else if(!subCategory) items = [{title : mainCategory}];
  else if(!isSubCategoryOf(mainCategory, subCategory)) {throw new Error("카테고리가 일치하지 않습니다.");}
  else items = [{title : mainCategory},{title : subCategory}];
  
  items = items.map((item) => ({...item, className : classNames("SubSpan", className)}));

  return <Breadcrumb separator={separator} items={items}/>
  
}