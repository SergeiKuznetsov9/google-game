import { getWinner, playAgain } from "../../../core/state-manager.js";
import { ButtonComponent } from "../common/Button/Button.component.js";

export const WinComponent = () => {
  console.log("WinComponent Render");
  const localState = {
    buttonCleanHandler: "null",
  };

  const element = document.createElement("div");

  render(element, localState);

  return { element, localState };
};

const render = async (element, localState) => {
  const titleElement = document.createElement("h1");
  const winner = await getWinner();
  titleElement.append(`${winner} WIN`);
  element.append(titleElement);

  const buttonHandler = () => playAgain();

  const buttonComponent = ButtonComponent("PLAY AGAIN", buttonHandler);
  localState.buttonCleanHandler = buttonComponent.localState.cleanHandler;
  console.log(localState);
  element.append(buttonComponent.element);
};
