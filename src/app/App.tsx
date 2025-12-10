import { TextStyles } from "shared/styles/global/TextStyles";
import { Colors } from "shared/styles/global/Colors";
import { Layouts } from "shared/styles/global/Layouts";
import "./App.css"
import { MessageProvider, useMessageContext } from "app/providers/message";
import Header from "features/Header";
import { useEffect } from "react";
import { AppRoutes } from "./routes/routes";
import { useLoginContext } from "app/providers/login";
import type { User } from "shared/types/User";
import getLogin from "shared/lib/api/getLogin";

export default function App() {
  return (
    <MessageProvider>
      <AppLayout/>
    </MessageProvider>
  );
}

function AppLayout(){
  const [_,contextHolder] = useMessageContext()
  const [loginUser, setLoginUser] = useLoginContext()

  useEffect(() => {
    getLogin().then((data : User | null) => {
      setLoginUser(data || undefined);
    });
  }, [setLoginUser]);

  return(
    <>
      {contextHolder}
      <TextStyles/>
      <Colors/>
      <Layouts/>
      <Header/>
      <AppRoutes/>
    </>
  )
}