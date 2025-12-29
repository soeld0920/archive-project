import { createContext, useContext } from "react";
import useTextStyle from "../hook/useTextStyle";

type TextStyleValue = ReturnType<typeof useTextStyle>;
const TextStyleContext = createContext<TextStyleValue | null>(null);

export function TextStyleProvider({children}: {children: React.ReactNode}){
    const textStyle = useTextStyle();
  return (
    <TextStyleContext.Provider value={textStyle}>
      {children}
    </TextStyleContext.Provider>
  )
}

export function useTextStyleContext(){
  const context = useContext(TextStyleContext);
  if(!context) throw new Error("useTextStyleContext must be used within a textStyleProvider");
  return context;
}