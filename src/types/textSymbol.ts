type ToggleSymbol = {
  kind : "toggle";
  symbol : string;
  state : string;
  //style? : void;
}

type CommandSymbol = {
  kind : "command";
  command : string;
  parse : (raw : string) => unknown;
  //style? : void;
}

export type TextSymbol = ToggleSymbol | CommandSymbol

export const symbolList : TextSymbol[] = [
  {
    kind : "toggle",
    symbol : "**",
    state : "bold"
  },
  {
    kind : "toggle",
    symbol : "%%",
    state : "italic"
  },
  {
    kind : "toggle",
    symbol : "__",
    state : "underline"
  },
  {
    kind : "toggle",
    symbol : "~~",
    state : "lineThrough"
  },
  {
    kind : "command",
    command : "color",
    parse : (raw : string) => raw,
  },
  {
    kind : "command",
    command : "bgColor",
    parse : (raw : string) => raw,
  },
  {
    kind : "command",
    command : "fontSize",
    parse : (raw : string) => parseInt(raw),
  },
]

export type TextState = {
  bold : boolean;
  italic : boolean;
  underline : boolean;
  lineThrough : boolean;
  color : string;
  bgColor : string;
  fontSize : number;
}
