export const GoogleComponent = () => {
  const element = document.createElement("img");
  render(element);
  return { element };
};

const render = async (element) => {
  element.src = "ui/assets/images/google.png";
};
