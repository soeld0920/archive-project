export type TextStyle = {
  id : number;
  name : string;
  size : number;
  fontFamily : FontFamily;
  textRole : TextRole;
  bold : boolean;
  italic : boolean;
  underline : boolean;
  strikeout : boolean;
  color : string | null;
  highlight : string | null;
  align : string | null;
}

export type FontFamily = {
  id : number;
  name : string;
  key : string;
}

export type TextRole = {
  code : string;
  name : string;
}