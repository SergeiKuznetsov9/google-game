export const ButtonComponent = (title, handler) => {
  const element = document.createElement("button");
  element.classList.add("buttonComponent");

  render(element, title, handler);

  return { element };
};

const render = async (element, title, handler) => {
  element.append(title);
  element.addEventListener("click", handler);
};
