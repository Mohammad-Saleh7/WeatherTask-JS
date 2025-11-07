import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./i18n.js";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../src/theme.js";

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme} defaultMode="system">
    <CssBaseline />
    <App />
  </ThemeProvider>
);
