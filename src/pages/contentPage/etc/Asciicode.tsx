import PageForm from "components/blocks/PageForm";
import { Table, type CaptionProps, type ColumnProps, type TableData } from "components/blocks/Table";
import { asciicode } from "content/page";

type code = {
  char : string;
  code : number;
}

const cloumns : ColumnProps<code>[] = [
  {
    key : "char",
    title : "문자",
    className : "asciicode_char"
  },
  {
    key : "code",
    title : "번호",
    className : "asciicode_code",
    align : "center"
  }
]

const caption : CaptionProps = {
  text : "아스키코드 정리"
}

const table  : TableData<code> = {
  columns : cloumns,
  caption : caption,
  getRowId : (code) => code.char,
  part : 8,
  datas : [
  { char: "NULL", code: 0 },
  { char: "SOH", code: 1 },
  { char: "STX", code: 2 },
  { char: "ETX", code: 3 },
  { char: "EOT", code: 4 },
  { char: "ENQ", code: 5 },
  { char: "ACK", code: 6 },
  { char: "BEL", code: 7 },
  { char: "BS", code: 8 },
  { char: "TAB", code: 9 },      // HT
  { char: "LF", code: 10 },
  { char: "VT", code: 11 },
  { char: "FF", code: 12 },
  { char: "CR", code: 13 },
  { char: "SO", code: 14 },
  { char: "SI", code: 15 },
  { char: "DLE", code: 16 },
  { char: "DC1", code: 17 },
  { char: "DC2", code: 18 },
  { char: "DC3", code: 19 },
  { char: "DC4", code: 20 },
  { char: "NAK", code: 21 },
  { char: "SYN", code: 22 },
  { char: "ETB", code: 23 },
  { char: "CAN", code: 24 },
  { char: "EM", code: 25 },
  { char: "SUB", code: 26 },
  { char: "ESC", code: 27 },
  { char: "FS", code: 28 },
  { char: "GS", code: 29 },
  { char: "RS", code: 30 },
  { char: "US", code: 31 },
  { char: "SPACE", code: 32 },
  { char: "!", code: 33 },
  { char: "\"", code: 34 },
  { char: "#", code: 35 },
  { char: "$", code: 36 },
  { char: "%", code: 37 },
  { char: "&", code: 38 },
  { char: "'", code: 39 },
  { char: "(", code: 40 },
  { char: ")", code: 41 },
  { char: "*", code: 42 },
  { char: "+", code: 43 },
  { char: ",", code: 44 },
  { char: "-", code: 45 },
  { char: ".", code: 46 },
  { char: "/", code: 47 },
  { char: "0", code: 48 },
  { char: "1", code: 49 },
  { char: "2", code: 50 },
  { char: "3", code: 51 },
  { char: "4", code: 52 },
  { char: "5", code: 53 },
  { char: "6", code: 54 },
  { char: "7", code: 55 },
  { char: "8", code: 56 },
  { char: "9", code: 57 },
  { char: ":", code: 58 },
  { char: ";", code: 59 },
  { char: "<", code: 60 },
  { char: "=", code: 61 },
  { char: ">", code: 62 },
  { char: "?", code: 63 },
  { char: "@", code: 64 },
  { char: "A", code: 65 },
  { char: "B", code: 66 },
  { char: "C", code: 67 },
  { char: "D", code: 68 },
  { char: "E", code: 69 },
  { char: "F", code: 70 },
  { char: "G", code: 71 },
  { char: "H", code: 72 },
  { char: "I", code: 73 },
  { char: "J", code: 74 },
  { char: "K", code: 75 },
  { char: "L", code: 76 },
  { char: "M", code: 77 },
  { char: "N", code: 78 },
  { char: "O", code: 79 },
  { char: "P", code: 80 },
  { char: "Q", code: 81 },
  { char: "R", code: 82 },
  { char: "S", code: 83 },
  { char: "T", code: 84 },
  { char: "U", code: 85 },
  { char: "V", code: 86 },
  { char: "W", code: 87 },
  { char: "X", code: 88 },
  { char: "Y", code: 89 },
  { char: "Z", code: 90 },
  { char: "[", code: 91 },
  { char: "\\", code: 92 },
  { char: "]", code: 93 },
  { char: "^", code: 94 },
  { char: "_", code: 95 },
  { char: "`", code: 96 },
  { char: "a", code: 97 },
  { char: "b", code: 98 },
  { char: "c", code: 99 },
  { char: "d", code: 100 },
  { char: "e", code: 101 },
  { char: "f", code: 102 },
  { char: "g", code: 103 },
  { char: "h", code: 104 },
  { char: "i", code: 105 },
  { char: "j", code: 106 },
  { char: "k", code: 107 },
  { char: "l", code: 108 },
  { char: "m", code: 109 },
  { char: "n", code: 110 },
  { char: "o", code: 111 },
  { char: "p", code: 112 },
  { char: "q", code: 113 },
  { char: "r", code: 114 },
  { char: "s", code: 115 },
  { char: "t", code: 116 },
  { char: "u", code: 117 },
  { char: "v", code: 118 },
  { char: "w", code: 119 },
  { char: "x", code: 120 },
  { char: "y", code: 121 },
  { char: "z", code: 122 },
  { char: "{", code: 123 },
  { char: "|", code: 124 },
  { char: "}", code: 125 },
  { char: "~", code: 126 },
  { char: "DEL", code: 127 },
  ]
}

export default function Asciicode(){
  return(
    <PageForm page={asciicode}>
      <Table caption={table.caption} columns={table.columns} datas={table.datas} getRowId={table.getRowId} part={table.part}/>
    </PageForm>
  )
}