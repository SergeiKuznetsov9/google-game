export const SwitcherComponent = (title, handler, initialValue) => {
  const localState = { cleanHandler: null };

  const element = document.createElement("label");
  element.classList.add("switcherComponent");

  const elementLabel = document.createElement("span");
  elementLabel.classList.add("switcherComponent-label");

  const elementInput = document.createElement("input");
  elementInput.type = "checkbox";
  elementInput.classList.add("switcherComponent-input");
  elementInput.checked = initialValue;

  const elementSwitcher = document.createElement("span");
  elementSwitcher.classList.add("switcherComponent-switcher");

  const elementSwitcherPointer = document.createElement("span");
  elementSwitcherPointer.classList.add("switcherComponent-switcherPointer");

  elementSwitcher.append(elementSwitcherPointer);
  element.append(elementLabel, elementInput, elementSwitcher);

  render(element, elementLabel, elementInput, title, handler, localState);

  return { element, localState };
};

const render = async (
  element,
  elementLabel,
  elementInput,
  title,
  handler,
  localState
) => {
  elementLabel.append(title);
  elementInput.addEventListener("change", handler);

  localState.cleanHandler = () =>
    element.removeEventListener("change", handler);
};
