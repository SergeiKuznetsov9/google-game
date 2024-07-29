import {
  GAME_POINTS,
  GRID_SIZES,
  localStorageKeys,
} from "../../../constants/constants.js";
import { setGridSize, setPointsQuontity } from "../../../core/state-manager.js";

export const SettingsComponent = () => {
  const element = document.createElement("form");
  element.classList.add("settingComponent");

  render(element);

  return { element };
};

const render = async (element) => {
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

  const gridSizeLabel = document.createElement("label");
  const gridSizeSelect = document.createElement("select");
  gridSizeSelect.name = "gridSize";

  const gridSizeLabelText = document.createElement("span");
  gridSizeLabelText.append("Grid size");
  gridSizeLabel.append(gridSizeLabelText, gridSizeSelect);
  gridSizeLabel.classList.add("settingComponent-select");

  const pointsToWinLabel = document.createElement("label");
  const pointsToWinSelect = document.createElement("select");
  pointsToWinSelect.name = "pointsToWin";
  const pointsToWinLabelText = document.createElement("span");
  pointsToWinLabelText.append("Points to win");
  pointsToWinLabel.append(pointsToWinLabelText, pointsToWinSelect);
  pointsToWinLabel.classList.add("settingComponent-select");

  const pointsToLoseLabel = document.createElement("label");
  const pointsToLoseSelect = document.createElement("select");
  pointsToLoseSelect.name = "pointsToLose";
  const pointsToLoseLabelText = document.createElement("span");
  pointsToLoseLabelText.append("Points to lose");
  pointsToLoseLabel.append(pointsToLoseLabelText, pointsToLoseSelect);
  pointsToLoseLabel.classList.add("settingComponent-select");

  GRID_SIZES.forEach((size) => {
    const gridSizeOption = document.createElement("option");
    const sizesArray = size.split(",");
    gridSizeOption.append(`${sizesArray[0]}X${sizesArray[1]}`);
    gridSizeOption.value = size;
    gridSizeSelect.append(gridSizeOption);
  });
  gridSizeSelect.value = selectedGridSizeValue;

  GAME_POINTS.forEach((pointsQuontity) => {
    const pointsToWinOption = document.createElement("option");
    const pointsToLoseOption = document.createElement("option");

    pointsToWinOption.append(pointsQuontity);
    pointsToLoseOption.append(pointsQuontity);

    pointsToWinOption.value = pointsQuontity;
    pointsToLoseOption.value = pointsQuontity;

    pointsToWinSelect.append(pointsToWinOption);
    pointsToLoseSelect.append(pointsToLoseOption);
  });

  pointsToWinSelect.value = selectedWinPoints;
  pointsToLoseSelect.value = selectedLosePoints;

  const handler = (event) => {
    if (event.target.name === "gridSize") {
      setGridSize(event.target.value.split(","));
      return;
    }

    setPointsQuontity(event.target.name, event.target.value);
  };

  gridSizeSelect.addEventListener("change", handler);
  pointsToWinSelect.addEventListener("change", handler);
  pointsToLoseSelect.addEventListener("change", handler);

  element.append(gridSizeLabel, pointsToWinLabel, pointsToLoseLabel);
};
