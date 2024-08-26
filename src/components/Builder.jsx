import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../ItemTypes.js";
import GateModel from "../models/GateModel.js";

const BoxesStyled = styled.div`
  width: 30px;
  height: 30px;
  border: 1px solid red;
`;

function Boxes({ qubit, column, gate, gates, children }) {
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
    <BoxesStyled ref={drop}>
      {gate != "" ? <Gate {...{ qubit, column, gate, gates }} /> : ""}
    </BoxesStyled>
  );
}

const QubitRow = styled.div`
  display: flex;
`;

const GateStyle = styled.div`
  width: 20px;
  height: 20px;
  border: 5px solid blue;
`;

function Gate({ qubit, column, gate, gates }) {
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
    <GateStyle ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {gate}
    </GateStyle>
  );
}

const allowedGates = ["H", "X", "Y", "Z", "C", "N", "P", "T", "I", "m", "d"];

const GateHolder = styled.div`
  display: flex;
`;

export default function Builder({ gates }) {
  const [getGateSlots, setGateSlots] = useState(gates.gateSlots);

  useEffect(() => gates.observe(setGateSlots), []);

  return (
    <>
      <GateHolder>
        {allowedGates.map((gate) => (
          <Gate gate={gate} gates={gates} />
        ))}
      </GateHolder>
      {getGateSlots.map((row, qubit) => (
        <QubitRow key={qubit}>
          {row.map((gate, column) => (
            <Boxes
              key={qubit.toString() + "," + column.toString()}
              {...{ qubit, column, gates }}
              gate={gate}
            ></Boxes>
          ))}
        </QubitRow>
      ))}
    </>
  );
}
