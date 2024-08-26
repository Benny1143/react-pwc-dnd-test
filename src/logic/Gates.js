import GateModel from "../models/GateModel.js";

export class Gates {
  gateSlots = new Array(10).fill([]).map((b) => new Array(10).fill("")); // 10 by 10 grid
  observers = [];
  draggingGate = new GateModel(null, null, null);

  setDraggingGate(gate) {
    this.draggingGate = gate;
  }

  observe(o) {
    this.observers.push(o);
    this.emitChange();
    return () => {
      this.observers = this.observers.filter((t) => t !== o);
    };
  }

  moveGate(toQubit, toColumn) {
    console.log({ ...this.draggingGate, toQubit, toColumn });
    const { qubit, column, name } = this.draggingGate;
    this.gateSlots[toQubit][toColumn] = name;
    if (qubit != null && column != null) {
      this.gateSlots[qubit][column] = "";
    }
    this.emitChange();
  }

  canMoveGate(toQubit, toColumn) {
    // const [qubit, column] = this.gatePosition;
    // const dx = toQubit - qubit;
    // const dy = toColumn - column;
    return true;
  }

  emitChange() {
    const gateSlots = this.gateSlots;
    this.observers.forEach(
      (o) => o && o(JSON.parse(JSON.stringify(gateSlots)))
    );
  }
}
