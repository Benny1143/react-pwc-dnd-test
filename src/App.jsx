import React, { useMemo } from "react";
import styled from "styled-components";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Game } from "./Game";
import { Board } from "./Board";

const TutorialApp = styled.div`
  width: 500px;
  height: 200px;
  border: 1px solid gray;
`;

export default function App() {
  const game = useMemo(() => new Game(), []);
  console.log("Load App");

  return (
    <DndProvider backend={HTML5Backend}>
      <TutorialApp>
        <Board game={game} />
      </TutorialApp>
    </DndProvider>
  );
}
