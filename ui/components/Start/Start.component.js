import { start } from "../../../core/state-manager.js";
import { ButtonComponent } from "../common/Button/Button.component.js";

export const StartComponent = () => {
  const localState = {
    buttonCleanHandler: null,
  };

  const element = document.createElement("div");
  element.classList.add("startComponent");

  render(element, localState);

  return { element, localState };
};

const render = async (element, localState) => {
  const handler = () => {
    start();
  };
  const buttonComponent = ButtonComponent("START GAME", handler);

  localState.buttonCleanHandler = buttonComponent.localState.cleanHandler;

  element.append(buttonComponent.element);
};
