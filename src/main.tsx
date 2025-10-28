import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { Theme } from "@radix-ui/themes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);