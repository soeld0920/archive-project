export type User = {
  UUID: string,
  email : string;
  role : "admin" | "user";
  nickname:  string,

  bio : string;
  bannerImage:  string,

  totalWriting: number,
  totalComment: number,
  totalView: number,
  totalGreat: number;

  writingList : string[]; //UUID
  greatPostIds : string[];
  bookmarkedPostIds: string[];
  seriesIds: string[];

  theme? : "light" | "dark";

  id : string; //4 이상 20 이하, 특수문자 금지
  password : string; //첫 문자 특수문자, 대문자 및 소문자 포함 필수, 길이 8 이상
}
