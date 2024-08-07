import { EVENTS } from "../../../constants/constants.js";
import {
  getGooglePoints,
  getPlayerPoints,
  subscribe,
  unsubscribe,
} from "../../../core/state-manager.js";
import { TimerComponent } from "./Timer/Timer.component.js";

export const ResultPanelComponent = () => {
  const localState = {
    cleanupFunctions: [],
  };
  const element = document.createElement("div");
  element.classList.add("resultPanelComponent");

  const observer = (event) => {
    if (event.name === EVENTS.SCORES_CHANGED) {
      render(element, localState);
    }
  };
  subscribe(observer);

  render(element, localState);

  return {
    element,
    cleanUp: () => {
      unsubscribe(observer);
    },
  };
};

const render = async (element, localState) => {
  localState.cleanupFunctions.forEach((cf) => cf());
  localState.cleanupFunctions = [];

  const timerComponent = TimerComponent();
  localState.cleanupFunctions.push(timerComponent.cleanUp);

  element.innerHTML = "";
  const googlePoints = await getGooglePoints();
  const player1Points = await getPlayerPoints(1);
  const player2Points = await getPlayerPoints(2);

  const player1Block = document.createElement("div");
  player1Block.classList.add("resultPanelComponent-player1Block");
  const player1BlockTitle = document.createElement("span");
  player1BlockTitle.append("Player 1");
  const player1BlockImg = document.createElement("img");
  player1BlockImg.src = "ui/assets/images/player1.png";
  const player1BlockScore = document.createElement("span");
  player1BlockScore.append(player1Points);
  player1Block.append(player1BlockTitle, player1BlockImg, player1BlockScore);

  const player2Block = document.createElement("div");
  player2Block.classList.add("resultPanelComponent-player2Block");

  const player2BlockTitle = document.createElement("span");
  player2BlockTitle.append("Player 2");
  const player2BlockImg = document.createElement("img");
  player2BlockImg.src = "ui/assets/images/player2.png";
  const player2BlockScore = document.createElement("span");
  player2BlockScore.append(player2Points);
  player2Block.append(player2BlockTitle, player2BlockImg, player2BlockScore);

  const googleBlock = document.createElement("div");
  googleBlock.classList.add("resultPanelComponent-googleBlock");
  const googleBlockTitle = document.createElement("span");
  googleBlockTitle.append("Google");
  const googleBlockImg = document.createElement("img");
  googleBlockImg.src = "ui/assets/images/google.png";
  const googleBlockScore = document.createElement("span");
  googleBlockScore.append(googlePoints);
  googleBlock.append(googleBlockTitle, googleBlockImg, googleBlockScore);

  element.append(
    player1Block,
    player2Block,
    googleBlock,
    timerComponent.element
  );
};
