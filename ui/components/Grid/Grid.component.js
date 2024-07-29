import { MOVING_DIRECTIONS } from "../../../constants/constants.js";
import { getGridSize, movePlayer } from "../../../core/state-manager.js";
import { CellComponent } from "./Cell/Cell.component.js";

export const GridComponent = () => {
  const localState = { cleanupFunctions: [] };

  const keyupHandler = (event) => {
    switch (event.code) {
      case "ArrowLeft":
        movePlayer(1, MOVING_DIRECTIONS.LEFT);
        break;

      case "ArrowRight":
        movePlayer(1, MOVING_DIRECTIONS.RIGHT);
        break;

      case "ArrowUp":
        movePlayer(1, MOVING_DIRECTIONS.UP);
        break;

      case "ArrowDown":
        movePlayer(1, MOVING_DIRECTIONS.DOWN);
        break;

      case "KeyA":
        movePlayer(2, MOVING_DIRECTIONS.LEFT);
        break;

      case "KeyD":
        movePlayer(2, MOVING_DIRECTIONS.RIGHT);
        break;

      case "KeyW":
        movePlayer(2, MOVING_DIRECTIONS.UP);
        break;

      case "KeyS":
        movePlayer(2, MOVING_DIRECTIONS.DOWN);
        break;

      default:
        break;
    }
  };

  document.addEventListener("keyup", keyupHandler);

  const element = document.createElement("table");
  element.classList.add("gridComponent");

  render(element, localState);

  return {
    element,
    cleanUp: () => {
      localState.cleanupFunctions.forEach((cf) => cf());
      document.removeEventListener("keyup", keyupHandler);
    },
  };
};

const render = async (element, localState) => {
  localState.cleanupFunctions.forEach((cf) => cf());
  localState.cleanupFunctions = [];

  element.innerHTML = "";

  const gridSize = await getGridSize();

  for (let y = 0; y < gridSize.rowsCount; y++) {
    const rowElement = document.createElement("tr");

    for (let x = 0; x < gridSize.columnsCount; x++) {
      const cellComponent = CellComponent(x, y);
      localState.cleanupFunctions.push(cellComponent.cleanUp);
      rowElement.append(cellComponent.element);
    }

    element.append(rowElement);
  }
};
