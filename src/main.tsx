import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ThemeProvider } from "./context/ThemeContext";
import { TopbarProvider } from "./context/TopbarContext";
import { registerServiceWorker } from "./lib/notifications";
import "./index.css";
import App from "./App";

registerServiceWorker();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <TopbarProvider>
          <App />
        </TopbarProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);