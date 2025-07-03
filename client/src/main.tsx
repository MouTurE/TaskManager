import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./Styles/App.css";
import "./Styles/Categories.css";
import "./Styles/Tasks.css";
import "./Styles/ToolBar.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
