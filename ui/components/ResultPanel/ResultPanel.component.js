import { EVENTS } from "../../../constants/constants.js";
import {
  getGooglePoints,
  getPlayerPoints,
  subscribe,
  unsubscribe,
} from "../../../core/state-manager.js";

export const ResultPanelComponent = () => {
  const element = document.createElement("div");
  element.classList.add("resultPanelComponent");

  const observer = (event) => {
    if (event.name === EVENTS.SCORES_CHANGED) {
      render(element);
    }
  };
  subscribe(observer);

  render(element);

  return { element, cleanUp: () => unsubscribe(observer) };
};

const render = async (element) => {
  element.innerHTML = "";
  const googlePoints = await getGooglePoints();
  const player1Points = await getPlayerPoints(1);
  const player2Points = await getPlayerPoints(2);

  element.append(
    `Player1: ${player1Points}, Player2: ${player2Points}, Google: ${googlePoints}`
  );
};
