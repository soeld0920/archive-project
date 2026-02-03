/*
  현재 선택된 카테고리를 보여주는 컴포넌트
  카테고리 미 선택시 fallback 값 표시
*/

import { Breadcrumb } from "antd";
import type { BreadcrumbItemType, BreadcrumbSeparatorType } from "antd/es/breadcrumb/Breadcrumb";
import classNames from "classnames";

type CategoryBreadCrumpProps = {
  className? :string;
  fallback? : string;
  categoryPath? : string;
}

export default function CategoryBreadcrumb({categoryPath, className, fallback = "전체보기"} : CategoryBreadCrumpProps){

  const separator = ">";
  let items : Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[] = [];
  
  if(!categoryPath) {
    items = [{title : fallback}];
  } else {
    const categories = categoryPath.split(">").map(cat => cat.trim()).filter(cat => cat.length > 0);
    items = categories.map(category => ({title : category}));
  }
  
  items = items.map((item) => ({...item, className : "text-sm font-[Galmuri] text-gray-500 " + className}));

  return <Breadcrumb separator={separator} items={items}/>
  
}