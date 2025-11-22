//login 유무를 계속 들고다니기 위한 전역 context
import { createContext, useContext, useState } from "react";
import type { User } from "shared/types/User";

//undefined = 로그인 X
type LoginValue = ReturnType<typeof useState<User | undefined>>;
const LoginContext = createContext<LoginValue | null>(null);

export function LoginProvider({children} : {children : React.ReactNode}){
  const value = useState<User | undefined>(undefined);
  return(
    <LoginContext.Provider value={value}>
      {children}
    </LoginContext.Provider>
  )
}

export function useLoginContext(){
  const context = useContext(LoginContext);
  if(!context){
    throw new Error("useLoginContext must be used within a LoginProvider");
  }
  return context;
}