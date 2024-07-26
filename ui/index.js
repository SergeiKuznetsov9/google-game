import { subscribe } from "../core/state-manager.js";
import { AppComponent } from "./components/App.component.js";

const rootElement = document.getElementById("root");

const renderApp = () => {
  rootElement.innerHTML = "";
  const appComponent = AppComponent();
  rootElement.append(appComponent.element);
};

renderApp();
subscribe(renderApp);
