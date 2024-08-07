import {
  getPointsToWin,
  getTimer,
  getWinner,
  playAgain,
} from "../../../core/state-manager.js";
import { ButtonComponent } from "../common/Button/Button.component.js";

export const WinComponent = () => {
  const localState = {
    buttonCleanHandler: [],
  };

  const element = document.createElement("div");
  element.classList.add("winComponent");

  render(element, localState);

  return { element, localState };
};

const render = async (element, localState) => {
  const winner = await getWinner();

  const time = await getTimer();

  const playerPoints = await getPointsToWin();

  const winContainer = document.createElement("div");
  winContainer.classList.add("winComponent-container");

  const winHider = document.createElement("div");
  winHider.classList.add("winComponent-hider");

  const winHeader = document.createElement("div");
  winHeader.classList.add("winComponent-header");

  const crownImg = document.createElement("img");
  crownImg.src = "ui/assets/images/crown.png";
  winHeader.append(crownImg);

  const winBody = document.createElement("div");
  winBody.classList.add("winComponent-body");

  winContainer.append(winHeader, winHider, winBody);

  const winBodyTitle = document.createElement("h1");
  winBodyTitle.append("You Win!");

  const winBodyPlayer = document.createElement("span");
  winBodyPlayer.classList.add("winBodyPlayer");
  winBodyPlayer.append(winner);

  const winBodyPoints = document.createElement("span");
  winBodyPoints.classList.add("winBodyPoints");
  const winBodyPointsText = document.createElement("span");
  winBodyPointsText.append("Catch:");
  const winBodyPointsValue = document.createElement("span");
  winBodyPointsValue.classList.add("value");
  winBodyPointsValue.append(`${playerPoints}`);
  winBodyPoints.append(winBodyPointsText, winBodyPointsValue);

  const winBodyTime = document.createElement("span");
  winBodyTime.classList.add("winBodyTime");
  const winBodyTimeText = document.createElement("span");
  winBodyTimeText.append("Time:");
  const winBodyTimeValue = document.createElement("span");
  winBodyTimeValue.append(`${time.minutes}m ${time.seconds}s`);
  winBodyTimeValue.classList.add("value");
  winBodyTime.append(winBodyTimeText, winBodyTimeValue);

  const buttonHandler = () => playAgain();
  const buttonComponent = ButtonComponent("PLAY AGAIN", buttonHandler);
  localState.buttonCleanHandler.length = 0;
  localState.buttonCleanHandler.push(buttonComponent.localState.cleanHandler);

  winBody.append(
    winBodyTitle,
    winBodyPlayer,
    winBodyPoints,
    winBodyTime,
    buttonComponent.element
  );
  element.append(winContainer);
};
