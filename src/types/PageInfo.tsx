import type { JSX } from "react";

type comment = {
  writer : string;
  date : string;
  content : string;
}

export type Page = {
  UUID : string;
  title : string;
  author : string;
  formType : "snippet" | "series";
  seriesUUID? : string;
  seriesTitle? :string;
  date : string;
  view : number;
  great : number;
  comment : comment[];
  tag : string[];
  mainCategory : string;
  subCategory : string;
  image? :string;
  content : string; //앞에 보일 약 150자의 내용만
}