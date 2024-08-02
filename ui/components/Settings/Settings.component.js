import {
  GAME_POINTS,
  GAME_STATUSES,
  GRID_SIZES,
  localStorageKeys,
} from "../../../constants/constants.js";
import {
  getGameStatus,
  getIsMusicOn,
  setGridSize,
  setIsMusicOn,
  setPointsQuontity,
} from "../../../core/state-manager.js";
import { SelectComponent } from "../common/Select/Select.component.js";
import { SwitcherComponent } from "../common/Switcher/Switcher.component.js";

export const SettingsComponent = () => {
  const localState = {
    cleanHandlers: [],
  };
  const element = document.createElement("form");
  element.classList.add("settingComponent");

  render(element, localState);

  return { element, localState };
};

const render = async (element, localState) => {
  const gameStatus = await getGameStatus();
  const columnsQuontity = localStorage.getItem(localStorageKeys.GRID_COLUMNS);
  const rowsQuontity = localStorage.getItem(localStorageKeys.GRID_ROWS);
  const winPoints = localStorage.getItem(localStorageKeys.WIN_POINTS);
  const losePoints = localStorage.getItem(localStorageKeys.LOSE_POINTS);
  let selectedGridSizeValue = "4,4";
  let selectedWinPoints = "5";
  let selectedLosePoints = "5";

  if (
    columnsQuontity &&
    rowsQuontity &&
    GRID_SIZES.includes(`${rowsQuontity},${columnsQuontity}`)
  ) {
    selectedGridSizeValue = `${rowsQuontity},${columnsQuontity}`;
  }

  if (winPoints) {
    selectedWinPoints = winPoints;
  }

  if (losePoints) {
    selectedLosePoints = losePoints;
  }

  const pointsSelectHandler = (event) => {
    setPointsQuontity(event.target.name, event.target.value);
  };

  const gridSizeSelectHandler = (event) => {
    setGridSize(event.target.value.split(","));
  };

  const gridSizeSelectComponent = SelectComponent(
    "Grid size",
    "gridSize",
    GRID_SIZES.map((size) => {
      const sizesArray = size.split(",");
      return { value: size, text: `${sizesArray[0]}X${sizesArray[1]}` };
    }),
    selectedGridSizeValue,
    gameStatus === GAME_STATUSES.IN_PROGRESS,
    gridSizeSelectHandler
  );
  localState.cleanHandlers.push(
    gridSizeSelectComponent.localState.cleanHandler
  );

  const pointsToLoseSelectComponent = SelectComponent(
    "Points to lose",
    "pointsToLose",
    GAME_POINTS.map((point) => ({ value: point, text: point })),
    selectedLosePoints,
    gameStatus === GAME_STATUSES.IN_PROGRESS,
    pointsSelectHandler
  );
  localState.cleanHandlers.push(
    pointsToLoseSelectComponent.localState.cleanHandler
  );

  const pointsToWinSelectComponent = SelectComponent(
    "Points to win",
    "pointsToWin",
    GAME_POINTS.map((point) => ({ value: point, text: point })),
    selectedWinPoints,
    gameStatus === GAME_STATUSES.IN_PROGRESS,
    pointsSelectHandler
  );
  localState.cleanHandlers.push(
    pointsToWinSelectComponent.localState.cleanHandler
  );

  //----------------------------------------------------------------------

  const soundSwitcherHandler = (event) => {
    setIsMusicOn(event.target.checked);
  };
  const initialValue = await getIsMusicOn();
  const soundSwitcherComponent = SwitcherComponent(
    "Sound",
    soundSwitcherHandler,
    initialValue
  );
  localState.cleanHandlers.push(soundSwitcherComponent.localState.cleanHandler);

  //----------------------------------------------------------------------
  element.append(
    gridSizeSelectComponent.element,
    pointsToWinSelectComponent.element,
    pointsToLoseSelectComponent.element,
    soundSwitcherComponent.element
  );
};
