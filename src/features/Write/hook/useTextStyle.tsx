//현 textStyle을 저장하는 훅.
//

import { useEffect, useState } from "react";
import type { FontFamily, TextRole, TextStyle } from "../../../shared/types/entity/TextStyle";
import { api } from "axios/api";

export default function useTextStyle(){
  const [name, setName] = useState<string>("");
  const [size, setSize] = useState<number>(0);
  const [fontFamily, setFontFamily] = useState<FontFamily>({id : 0, name : "", key : ""});
  const [textRole, setTextRole] = useState<TextRole>({code : "", name : ""});
  const [bold, setBold] = useState<boolean>(false);
  const [italic, setItalic] = useState<boolean>(false);
  const [underline, setUnderline] = useState<boolean>(false);
  const [strikeout, setStrikeout] = useState<boolean>(false);
  const [color, setColor] = useState<string | null>(null);
  const [highlight, setHighlight] = useState<string | null>(null);
  const [align, setAlignValue] = useState<string | null>(null);

  const setTextStyle = (ts : TextStyle) => {
    setName(ts.name);
    setSize(ts.size);
    setFontFamily(ts.fontFamily);
    setTextRole(ts.textRole);
    setBold(ts.bold);
    setItalic(ts.italic);
    setUnderline(ts.underline);
    setStrikeout(ts.strikeout);
    setColor(ts.color);
    setHighlight(ts.highlight);
    setAlignValue(ts.align);
  }

  useEffect(() => {
    const fetchDefaultTextStyle = async () => {
      const response = await api.get("/textStyle/me/default");
      setTextStyle(response.data);
    }
    fetchDefaultTextStyle();
  }, []);

  const toggleBold = () => {
    setBold(!bold);
  }
  const toggleItalic = () => {
    setItalic(!italic);
  }
  const toggleUnderline = () => {
    setUnderline(!underline);
  }
  const toggleStrike = () => {
    setStrikeout(!strikeout);
  }
  const setAlign = (value : string) => {
    if(align == value){
      setAlignValue(null);
    } else {
      setAlignValue(value);
    }
  }

  return {name, size, fontFamily, textRole, bold, italic, underline, strikeout, color, highlight, align,
    setName, setSize, setFontFamily, setTextRole, setBold, setItalic, setUnderline, setStrikeout, setColor, setHighlight, setAlign,
    setTextStyle, toggleBold, toggleItalic, toggleUnderline, toggleStrike} as const;
}