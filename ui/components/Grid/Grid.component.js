import {
  getGridSize,
  subscribe,
  unsubscribe,
} from "../../../core/state-manager.js";
import { CellComponent } from "./Cell/Cell.component.js";

export const GridComponent = () => {
  const element = document.createElement("table");
  element.classList.add("gridComponent");

  const observer = () => {
    render(element);
  };
  subscribe(observer);

  render(element);

  return { element, cleanUp: () => unsubscribe(observer) };
};

const render = async (element) => {
  element.innerHTML = "";

  const gridSize = await getGridSize();

  for (let y = 0; y < gridSize.rowsCount; y++) {
    const rowElement = document.createElement("tr");

    for (let x = 0; x < gridSize.columnsCount; x++) {
      const cellComponent = CellComponent(x, y);
      rowElement.append(cellComponent.element);
    }

    element.append(rowElement);
  }
};
