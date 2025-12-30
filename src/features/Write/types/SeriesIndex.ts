export type SeriesIndex = {
  seriesUuid : string;
  title : string;
  category : CategoryResDto;
}

export type CategoryResDto = {
  id : number;
  name : string;
}