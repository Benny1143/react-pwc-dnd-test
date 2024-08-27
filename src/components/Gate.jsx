import { useDrag } from "react-dnd";
import { ItemTypes } from "../logic/ItemTypes.js";
import GateModel from "../models/GateModel";
import { Gates } from "../logic/Gates.js";
import styled from "styled-components";
import { useEffect } from "react";

const Wrapper = styled.div`
  width: 20px;
  height: 20px;
  border: 5px solid blue;
`;

/**
 * Gate component
 * @param {Object} props - Props of component
 * @param {number} props.qubit - The qubit the gate belong to
 * @param {number} props.column - The column the gate belong to
 * @param {string} props.gate - The gate name
 * @param {Gates} props.gates - The gates manager
 */
export function Gate({ qubit, column, gate, gates }) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.GATES,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    []
  );

  useEffect(() => {
    gates.setDraggingGate(new GateModel(gate, qubit, column));
  }, [isDragging]);

  return (
    <Wrapper ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {gate}
    </Wrapper>
  );
}
