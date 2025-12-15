import { TextStyles } from "shared/styles/global/TextStyles";
import { Colors } from "shared/styles/global/Colors";
import { Layouts } from "shared/styles/global/Layouts";
import "./App.css"
import { MessageProvider, useMessageContext } from "app/providers/message";
import Header from "features/Header";
import { AppRoutes } from "./routes/routes";

export default function App() {
  return (
    <MessageProvider>
      <AppLayout/>
    </MessageProvider>
  );
}

function AppLayout(){
  const [_,contextHolder] = useMessageContext()

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