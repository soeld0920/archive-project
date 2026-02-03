import { TextStyles } from "shared/styles/global/TextStyles";
import { Colors } from "shared/styles/global/Colors";
import { Layouts } from "shared/styles/global/Layouts";
import "./App.css"
import "shared/styles/font.css"
import { MessageProvider, useMessageContext } from "app/providers/message";
import { AppRoutes } from "./routes/routes";
import { useLocation } from "react-router-dom";
import { Header } from "features/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 쿼리클라이언트 = get 요청 결과 데이터 저장소(전역상태)
const queryClient = new QueryClient({
  defaultOptions : {
    queries : {
      //staleTime : 특정 시간마다 재요청
      //refetchOnWindowFocus : 윈도우 포커스 시 자동 리패치
    }
  }
});

export default function App() {
  return (
    <MessageProvider>
      <QueryClientProvider client={queryClient}>
        <AppLayout/>
      </QueryClientProvider>
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