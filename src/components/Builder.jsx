import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Gate } from "./Gate.jsx";
import { Slot } from "./Slot.jsx";

const QubitRow = styled.div`
  display: flex;
`;

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
          <Gate key={gate} gate={gate} gates={gates} />
        ))}
      </GateHolder>
      {getGateSlots.map((row, qubit) => (
        <QubitRow key={qubit}>
          {row.map((gate, column) => (
            <Slot
              key={qubit.toString() + "," + column.toString()}
              {...{ qubit, column, gate, gates }}
            ></Slot>
          ))}
        </QubitRow>
      ))}
    </>
  );
}
