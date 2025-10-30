import { message } from "antd";
import { createContext, useContext } from "react";

type MessageValue = ReturnType<typeof message.useMessage>
const MessageContext = createContext<MessageValue | null>(null);

export function MessageProvider({children} : {children : React.ReactNode}){
  const value = message.useMessage()
  return(
    <MessageContext.Provider value={value}>
      {children}
    </MessageContext.Provider>
  )
}

export function useMessageContext() {
  const ctx = useContext(MessageContext);
  if (!ctx) {
    throw new Error("useMessageContext must be used within <MessageProvider> (and under a Router).");
  }
  return ctx;
}