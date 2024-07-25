// чтобы ES модули работали в браузере нужно обязательно добавлять расширение импорту
import { getGooglePoints, getPlayerPoints } from "../core/state-manager.js";

const googlePoints = getGooglePoints();
const player1Points = getPlayerPoints(1);
const player2Points = getPlayerPoints(2);

const rootElement = document.getElementById("root");
rootElement.innerHTML = "";
rootElement.append(
  `Player1: ${player1Points}, Player2: ${player2Points}, Google: ${googlePoints}`
);
