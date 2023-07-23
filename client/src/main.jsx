import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Overlay from "./Overlay.jsx";
import { ProjectContext, ProjectDispatchContext } from "./context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Container>
      <App />
      <Overlay />
    </Container>
  </React.StrictMode>
);

export function Container({ children }) {
  const [color, setColor] = useState("");
  return (
    <ProjectContext.Provider value={color}>
      <ProjectDispatchContext.Provider value={setColor}>
        {children}
      </ProjectDispatchContext.Provider>
    </ProjectContext.Provider>
  );
}
