import { AppComponent } from "./components/App.component.js";

const rootElement = document.getElementById("root");

export const renderApp = () => {
  rootElement.innerHTML = "";
  const appComponent = AppComponent();
  rootElement.append(appComponent.element);
};

renderApp();
