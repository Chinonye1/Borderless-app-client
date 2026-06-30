import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { AuthWrapper } from "./context/auth.context.jsx";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "./theme.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthWrapper>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </AuthWrapper>
  </BrowserRouter>,
);
