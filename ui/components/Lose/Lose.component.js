import { playAgain } from "../../../core/state-manager.js";

export const LoseComponent = () => {
  const element = document.createElement("div");

  render(element);

  return { element };
};

const render = async (element) => {
  const titleElement = document.createElement("h1");
  titleElement.append("YOU LOSE, GOOGLE WIN");

  element.append(titleElement);
  const button = document.createElement("button");
  button.append("PLAY AGAIN");
  button.addEventListener("click", () => {
    playAgain();
  });

  element.append(button);
};
