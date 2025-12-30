export type AddWritingDto = {
  title : string;
  content : string;
  tag : string[];
  categoryId : number;
  seriesUuid : string | null;
}