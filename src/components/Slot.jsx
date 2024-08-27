import { useDrop } from "react-dnd";
import styled from "styled-components";
import { ItemTypes } from "../logic/ItemTypes";
import { Gate } from "./Gate";

const Wrapper = styled.div`
  width: 30px;
  height: 30px;
  border: 1px solid red;
`;

export function Slot({ qubit, column, gate, gates }) {
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ItemTypes.GATES,
      //   canDrop: () => gates.canMoveGate(qubit, column),
      canDrop: () => true,
      drop: () => gates.moveGate(qubit, column),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [gate]
  );

  return (
    <Wrapper ref={drop}>
      {gate != "" ? <Gate {...{ qubit, column, gate, gates }} /> : ""}
    </Wrapper>
  );
}
