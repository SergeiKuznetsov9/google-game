export const PlayerComponent = (playerNumber) => {
  const element = document.createElement("img");
  render(element, playerNumber);
  return { element };
};

const render = async (element, playerNumber) => {
  element.src = `ui/assets/images/player${playerNumber}.png`;
};
