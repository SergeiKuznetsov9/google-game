import { subscribe } from "../core/state-manager.js";
import { AppComponent } from "./components/App.component.js";

const rootElement = document.getElementById("root");

// Этот рендер экспортировать для импорта в state-manager нельзя
const renderApp = () => {
  rootElement.innerHTML = "";
  const appComponent = AppComponent();
  rootElement.append(appComponent.element);
};

renderApp();

// Для того, чтобы вызвать его в нужный момент передадим его в функцию subscribe
// Это функцию реализуем в state-manager
subscribe(renderApp);
