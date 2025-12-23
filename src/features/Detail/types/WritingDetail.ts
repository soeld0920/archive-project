import type { Tag } from "shared/types/entity/Tag";

export type WritingDetail = {
  writingUuid : string;
  writingTitle : string;
  content : string;
  view : number;
  great : number;
  commentCount : number;
  mainCategoryName : string;
  subCategoryName : string;
  authorUuid : string;
  authorName : string;
  seriesUuid : string;
  seriesName : string;
  seriesOrder : number;
  tag : Tag[];
  updateAt : string | Date;
  createAt : string | Date;
}