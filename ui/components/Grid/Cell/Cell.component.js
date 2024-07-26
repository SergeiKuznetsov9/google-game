export const CellComponent = (x, y) => {
  const element = document.createElement("td");
  render(element, x, y);
  return { element };
};

const render = async (element, x, y) => {
  element.append(`${y}, ${x}`);
};
