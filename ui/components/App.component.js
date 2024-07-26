import { GridComponent } from "./Grid/Grid.component.js";
import { ResultPanelComponent } from "./ResultPanel/ResultPanel.component.js";
import { SettingsComponent } from "./Settings/Settings.component.js";

export const AppComponent = () => {
  const element = document.createElement("div");

  const settingsElement = SettingsComponent();
  const resultPanelElement = ResultPanelComponent();
  const gridElement = GridComponent();

  element.append(settingsElement, resultPanelElement, gridElement);

  return element;
};
