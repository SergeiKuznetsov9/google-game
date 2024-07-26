import { getGridSize } from "../../../core/state-manager.js";

export const GridComponent = () => {
  const element = document.createElement("table");

  render(element);

  return { element };
};

const render = async (element) => {
  element.classList.add("gridComponent");

  const gridSize = await getGridSize();

  for (let y = 0; y < gridSize.rowsCount; y++) {
    const rowElement = document.createElement("tr");

    for (let x = 0; x < gridSize.columnsCount; x++) {
      const cellElement = document.createElement("td");
      cellElement.append(`${y}, ${x}`);
      rowElement.append(cellElement);
    }

    element.append(rowElement);
  }
};
