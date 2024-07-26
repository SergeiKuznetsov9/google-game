import {
  getGooglePoints,
  getPlayerPoints,
} from "../../../core/state-manager.js";

export const ResultPanelComponent = () => {
  const element = document.createElement("div");
  element.classList.add("result-panel");

  const render = async () => {
    const googlePoints = await getGooglePoints();
    const player1Points = await getPlayerPoints(1);
    const player2Points = await getPlayerPoints(2);

    element.append(
      `Player1: ${player1Points}, Player2: ${player2Points}, Google: ${googlePoints}`
    );
  };

  render();

  return element;
};
