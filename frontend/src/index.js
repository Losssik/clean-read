import React from "react";
import ReactDOM from "react-dom/client";
import "../src/styles/style.scss";
import App from "./App";
import { ArticleContextProvider } from "./context/ArticleContext";
import { AuthContextProvider } from "./context/AuthContext";
import { ReadLaterListContextProvider } from "./context/ReadLaterListContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ReadLaterListContextProvider>
        <ArticleContextProvider>
          <App />
        </ArticleContextProvider>
      </ReadLaterListContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
