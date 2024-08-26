import React, { useMemo } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Builder from "./components/Builder.jsx";
import { Gates } from "./logic/Gates.js";

export default function App() {
  const gates = useMemo(() => new Gates(), []);

  return (
    <DndProvider backend={HTML5Backend}>
      <Builder gates={gates} />
    </DndProvider>
  );
}
