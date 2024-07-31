export const ButtonComponent = (title, handler) => {
  const localState = { cleanHandler: null };

  const element = document.createElement("button");
  element.classList.add("buttonComponent");

  render(element, title, handler, localState);

  return { element, localState };
};

const render = async (element, title, handler, localState) => {
  element.append(title);
  element.addEventListener("click", handler);

  localState.cleanHandler = () => element.removeEventListener("click", handler);
};
