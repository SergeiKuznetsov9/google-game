import { start } from "../../../core/state-manager.js";

export const StartComponent = () => {
  const element = document.createElement("div");

  render(element);

  return { element };
};

const render = async (element) => {
  const button = document.createElement("button");
  button.append("START GAME");
  button.addEventListener("click", () => {
    start();
  });

  element.append(button);
};
