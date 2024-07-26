import {
  getGooglePoints,
  getPlayerPoints,
} from "../../../core/state-manager.js";

export const ResultPanelComponent = () => {
  const element = document.createElement("div");
  element.classList.add("result-panel");

  render(element);

  // Обернем возвращаемые значения компонентами в объект и вынесем наружу рендер
  // Такой подход реализуем во всех компонентах
  return { element };
};

const render = async (element) => {
  const googlePoints = await getGooglePoints();
  const player1Points = await getPlayerPoints(1);
  const player2Points = await getPlayerPoints(2);

  element.append(
    `Player1: ${player1Points}, Player2: ${player2Points}, Google: ${googlePoints}`
  );
};
