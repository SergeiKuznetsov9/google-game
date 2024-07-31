import { start } from "../../../core/state-manager.js";
import { ButtonComponent } from "../common/Button/Button.component.js";

export const StartComponent = () => {
  const localState = {
    renderedElement: null,
    handler: null,
  };

  const element = document.createElement("div");
  element.classList.add("startComponent");

  render(element, localState);

  return { element, localState };
};

const render = async (element, localState) => {
  if (localState.renderedElement) {
    localState.renderedElement.removeEventListener("click", localState.handler);
  }

  const handler = () => {
    start();
  };
  const buttonComponent = ButtonComponent("START GAME", handler);
  localState.renderedElement = buttonComponent.element;
  localState.handler = handler;

  element.append(buttonComponent.element);
};
