export type CommentReq = {
  content : string;
}

export type CommentRes = {
  order : number;
  userUuid : string;
  userName : string;
  userBanner : string;
  createAt : string;
  updateAt : string;
  content : string;
}