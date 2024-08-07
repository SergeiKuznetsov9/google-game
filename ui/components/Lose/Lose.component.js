import {
  getPointsToLose,
  getTimer,
  playAgain,
} from "../../../core/state-manager.js";
import { ButtonComponent } from "../common/Button/Button.component.js";

export const LoseComponent = () => {
  const localState = {
    buttonCleanHandler: [],
  };

  const element = document.createElement("div");
  element.classList.add("loseComponent");

  render(element, localState);

  return { element, localState };
};

const render = async (element, localState) => {
  const time = await getTimer();

  const googlePoints = await getPointsToLose();

  const loseContainer = document.createElement("div");
  loseContainer.classList.add("loseComponent-container");

  const loseHider = document.createElement("div");
  loseHider.classList.add("loseComponent-hider");

  const loseHeader = document.createElement("div");
  loseHeader.classList.add("loseComponent-header");

  const crownImg = document.createElement("img");
  crownImg.src = "ui/assets/images/crown.png";
  loseHeader.append(crownImg);

  const loseBody = document.createElement("div");
  loseBody.classList.add("loseComponent-body");

  loseContainer.append(loseHeader, loseHider, loseBody);

  const loseBodyTitle = document.createElement("h1");
  loseBodyTitle.append("Google Win!");

  const loseBodyPlayer = document.createElement("span");
  loseBodyPlayer.classList.add("loseBodyPlayer");
  loseBodyPlayer.append("You`ll be lucky next time");

  const loseBodyPoints = document.createElement("span");
  loseBodyPoints.classList.add("loseBodyPoints");
  const loseBodyPointsText = document.createElement("span");
  loseBodyPointsText.append("Catch:");
  const loseBodyPointsValue = document.createElement("span");
  loseBodyPointsValue.classList.add("value");
  loseBodyPointsValue.append(`${googlePoints}`);
  loseBodyPoints.append(loseBodyPointsText, loseBodyPointsValue);

  const loseBodyTime = document.createElement("span");
  loseBodyTime.classList.add("loseBodyTime");
  const loseBodyTimeText = document.createElement("span");
  loseBodyTimeText.append("Time:");
  const loseBodyTimeValue = document.createElement("span");
  loseBodyTimeValue.append(`${time.minutes}m ${time.seconds}s`);
  loseBodyTimeValue.classList.add("value");
  loseBodyTime.append(loseBodyTimeText, loseBodyTimeValue);

  const buttonHandler = () => playAgain();
  const buttonComponent = ButtonComponent("PLAY AGAIN", buttonHandler);
  localState.buttonCleanHandler.length = 0;
  localState.buttonCleanHandler.push(buttonComponent.localState.cleanHandler);

  loseBody.append(
    loseBodyTitle,
    loseBodyPlayer,
    loseBodyPoints,
    loseBodyTime,
    buttonComponent.element
  );
  element.append(loseContainer);
};
