import { getGooglePoints, getPlayerPoints } from "../../core/state-manager.js";

export const AppComponent = () => {
  const element = document.createElement("div");

  const googlePoints = getGooglePoints();
  const player1Points = getPlayerPoints(1);
  const player2Points = getPlayerPoints(2);

  element.append(
    `Player1: ${player1Points}, Player2: ${player2Points}, Google: ${googlePoints}`
  );

  return element;
};
