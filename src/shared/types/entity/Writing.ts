import type { MainCategory, SubCategory } from "./Category";
import type { User } from "../User";

export type FORM_TYPE = "snippet" | "series"

export type WritingIndex = {
  writingUuid : string;
  writingTitle : string;
  authorUUID : string; //링크용
  authorName : string; //표시용
  seriesUUID? : string; 
  seriesTitle? :string;
  createAt : string;
  view : number;
  great : number;
  commentCount : number;
  tag : string[];
  mainCategoryName : string;
  subCategoryName : string;
  image? :string;
  content : string; //앞에 보일 약 150자의 내용만
}

export type Writing = {
  UUID : string;
  title : string;
  authorUUID : string; //id

  formType : FORM_TYPE;
  seriesUUID? : string; //id

  date : string;
  view : number;
  great : number;

  comment : Comment[];
  tag : string[];

  mainCategory : MainCategory;
  subCategory : SubCategory;
  
  contentId : string;
}


export type Series = {
  UUID : string;
  title : string;
  WritingList : string[]; //UUID
  view : number;
  tag : string[];

  seriesType : "single" | "composite"; // single이면 category 존재
  mainCategory? : string;
  subCategory? : string;
}