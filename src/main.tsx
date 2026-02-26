import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.tsx";
import { store } from "./app/store";
import { ThemeProvider } from "./hooks/theme-provider.tsx";
// import { store } from "./store/store.ts";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <Router>
      <ThemeProvider defaultTheme="light" storageKey="theme-preference">
        <App />
      </ThemeProvider>
    </Router>
  </Provider>,
);
