import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@atlaskit/css-reset";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
