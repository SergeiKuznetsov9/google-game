import { AppComponent } from "./components/App.component.js";

// Здесь происходит смешивание компетенций, так лучше не делать, поэтому
// перенесем функцию создания компонента в отдельный модуль

const rootElement = document.getElementById("root");
rootElement.innerHTML = "";
const appElement = AppComponent();

rootElement.append(appElement);
