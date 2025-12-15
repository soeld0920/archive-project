import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./app/App";

// 앱 시작
async function startApp() {

  // MSW 비활성화 - 실제 서버(8080) 사용
  // MSW를 다시 활성화하려면 아래 주석을 해제하세요
  // if (import.meta.env.DEV) {
  //   const { worker } = await import("./mocks/browser");
  //   await worker.start({
  //     onUnhandledRequest: (request, print) => {
  //       if (request.url.includes('/src/')) {
  //         return;
  //       }
  //       print.warning();
  //     },
  //   });
  // }

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
}

startApp();