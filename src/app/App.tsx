import { TextStyles } from "shared/styles/global/TextStyles";
import { Colors } from "shared/styles/global/Colors";
import { Layouts } from "shared/styles/global/Layouts";
import "./App.css"
import "shared/styles/font.css"
import { MessageProvider, useMessageContext } from "app/providers/message";
import { AppRoutes } from "./routes/routes";
import { useLocation } from "react-router-dom";
import { Header } from "features/Header";

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
  const notIncludeHeaderComponents = !(location.pathname.includes("/write") || location.pathname.includes("/login") || location.pathname.includes("/join"));

  return(
    <>
      {contextHolder}
      <TextStyles/>
      <Colors/>
      <Layouts/>
      {notIncludeHeaderComponents && <Header/>}
      <AppRoutes/>
    </>
  )
}