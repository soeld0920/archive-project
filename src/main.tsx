import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./app/App";
import { LoginProvider } from "app/providers/login";

// 앱 시작
async function startApp() {


  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/browser");
    await worker.start({
      onUnhandledRequest: (request, print) => {
        // Vite의 동적 모듈 로딩 요청(/src/...?import)은 무시
        if (request.url.includes('/src/')) {
          return;
        }
        // 그 외의 핸들되지 않은 요청은 경고
        print.warning();
      },
    });
  }

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <BrowserRouter>
        <LoginProvider>
          <App />
        </LoginProvider>
      </BrowserRouter>
    </StrictMode>
  );
}

startApp();