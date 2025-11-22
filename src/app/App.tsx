import { TextStyles } from "shared/styles/global/TextStyles";
import { Colors } from "shared/styles/global/Colors";
import { Layouts } from "shared/styles/global/Layouts";
import "./App.css"
import { MessageProvider, useMessageContext } from "app/providers/message";
import Header from "features/Header";
import { LoginProvider } from "app/providers/login";
import { getLogin } from "shared/lib/api/getLogin";
import { useEffect } from "react";
import { AppRoutes } from "./routes/routes";
import { useDispatch } from "react-redux";
import { setLoginUser } from "store/login";

export default function App() {
  return (
    <MessageProvider>
      <LoginProvider>
        <AppLayout/>
      </LoginProvider>
    </MessageProvider>
  );
}

function AppLayout(){
  const [_,contextHolder] = useMessageContext()
  const dispatch = useDispatch()

  useEffect(() => {
    getLogin().then((data) => {
      dispatch(setLoginUser(data));
    });
  }, []);

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