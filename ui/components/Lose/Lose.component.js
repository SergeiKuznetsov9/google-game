import { playAgain } from "../../../core/state-manager.js";
import { ButtonComponent } from "../common/Button/Button.component.js";

export const LoseComponent = () => {
  const localState = {
    buttonCleanHandler: null,
  };

  const element = document.createElement("div");

  render(element, localState);

  return { element, localState };
};

const render = async (element, localState) => {
  const titleElement = document.createElement("h1");
  titleElement.append("YOU LOSE, GOOGLE WIN");
  element.append(titleElement);

  const buttonHandler = () => playAgain();

  const buttonComponent = ButtonComponent("PLAY AGAIN", buttonHandler);
  localState.buttonCleanHandler = buttonComponent.localState.cleanHandler;

  element.append(buttonComponent.element);
};
