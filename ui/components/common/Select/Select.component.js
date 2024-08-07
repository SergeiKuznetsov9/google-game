export const SelectComponent = (
  label,
  name,
  options,
  selectedOption,
  isDisabled,
  handler
) => {
  const localState = {
    cleanHandler: null,
  };

  const element = document.createElement("label");
  element.classList.add("selectComponent");

  const elementLabelText = document.createElement("span");
  elementLabelText.append(label);
  const elementSelect = document.createElement("select");
  elementSelect.disabled = isDisabled;
  elementSelect.name = name;

  options.forEach(({ value, text }) => {
    const optionElement = document.createElement("option");
    optionElement.value = value;
    optionElement.append(text);
    elementSelect.append(optionElement);
  });
  elementSelect.value = selectedOption;
  element.append(elementLabelText, elementSelect);

  render(element, handler, localState);

  return { element, localState };
};

const render = async (element, handler, localState) => {
  element.addEventListener("change", handler);
  localState.cleanHandler = () =>
    element.removeEventListener("change", handler);
};
