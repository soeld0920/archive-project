import { TextStyles } from "shared/styles/global/TextStyles";
import { Colors } from "shared/styles/global/Colors";
import { Layouts } from "shared/styles/global/Layouts";
import "./App.css"
import { MessageProvider, useMessageContext } from "app/providers/message";
import Header from "features/Header";
import { AppRoutes } from "./routes/routes";
import { useLocation } from "react-router-dom";

export default function App() {
  return (
    <MessageProvider>
      <AppLayout/>
    </MessageProvider>
  );
}

function AppLayout(){
  const [_,contextHolder] = useMessageContext()
  const location = useLocation();
  const isWritePage = location.pathname === "/write";

  return(
    <>
      {contextHolder}
      <TextStyles/>
      <Colors/>
      <Layouts/>
      {!isWritePage && <Header/>}
      <AppRoutes/>
    </>
  )
}